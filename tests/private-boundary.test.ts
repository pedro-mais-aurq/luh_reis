import { describe, expect, it } from 'vitest';
import { mkdtemp, writeFile, rm, mkdir } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import type { ResolvedConfig } from 'vite';
import { localReviewReply, isLocalReviewRequest, privateReviewPlugin } from '../scripts/private-review-server';
const request = {url:'/__luh_review/program',method:'GET',host:'127.0.0.1:5174',remoteAddress:'127.0.0.1'};
describe('Limite privado de desenvolvimento', () => {
  it('recusa hosts externos, conexões remotas e origem diferente', () => {
    expect(isLocalReviewRequest(request)).toBe(true);
    for (const patch of [{host:'evil.example:5174'},{remoteAddress:'10.0.0.2'},{origin:'https://evil.example'},{host:'localhost.evil.example'}]) expect(isLocalReviewRequest({...request,...patch})).toBe(false);
    expect(isLocalReviewRequest({...request,origin:'http://127.0.0.1:5174'})).toBe(true);
  });
  it('só serve arquivos pela revisão opt-in local e IDs registrados', async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(),'luh-review-'));
    try {
      await mkdir(path.join(dir,'media'));await writeFile(path.join(dir,'program.json'),'{"sentinel":"private-test"}');await writeFile(path.join(dir,'media','test.svg'),'<svg/>');await writeFile(path.join(dir,'media-manifest.json'),JSON.stringify({assets:[{id:'test',file:'media/test.svg'},{id:'escape',file:'../outside.svg'}]}));
      const options = {enabled:true,directory:dir,base:'/'};
      expect((await localReviewReply(request,options)).status).toBe(200);
      for (const req of [{...request,method:'POST'},{...request,host:'remote.example'},{...request,remoteAddress:'10.0.0.2'},{...request,url:'/__luh_review/media/../program.json'},{...request,url:'/__luh_review/media/%2e%2e%2fprogram.json'},{...request,url:'/__luh_review/media/unknown'},{...request,url:'/__luh_review/media/escape'},{...request,url:'/private/training/program.json'}]) expect((await localReviewReply(req,options)).status).toBe(404);
      expect((await localReviewReply({...request,url:'/__luh_review/media/test'},options)).type).toBe('image/svg+xml');
      expect((await localReviewReply({...request,url:'/__luh_review/program?unlock=true'},{...options,enabled:false})).status).toBe(404);
      expect((await localReviewReply({...request,url:'/luh-reis/__luh_review/program'},{...options,base:'/luh-reis/'})).status).toBe(200);
    } finally {await rm(dir,{recursive:true,force:true});}
  });
  it('recusa build ou rede aberta com a flag privada e bloqueia imports privados', () => {
    const plugin = privateReviewPlugin(true,'/');
    const configure = plugin.configResolved as (config:ResolvedConfig)=>void;
    expect(()=>configure({root:process.cwd(),command:'build',server:{host:'127.0.0.1'}} as ResolvedConfig)).toThrow(/não pode ser habilitada em builds/);
    expect(()=>configure({root:process.cwd(),command:'serve',server:{host:'0.0.0.0'}} as ResolvedConfig)).toThrow(/loopback/);
    const load = plugin.load as (id:string)=>unknown;
    expect(()=>load('/project/private/training/program.json?raw')).toThrow(/Não importar/);
  });
});
