import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { TrainingWorkout, MediaManifest } from '../types/program';
import type { TrainingRepository } from '../repositories/TrainingRepository';
import { ExerciseIllustration } from './ExerciseIllustration';
export function WorkoutCard({ workout, manifest, repository }: { workout: TrainingWorkout; manifest: MediaManifest; repository: TrainingRepository }) {
  const media = manifest.assets.find(a => a.id === workout.coverImageId);
  return <article className="workout-card"><Link className="workout-card-link" to={`/treinos/${workout.id}`} aria-label={`Abrir ${workout.title}`}><span className="workout-letter" aria-hidden="true">{workout.label}</span><ExerciseIllustration media={media} url={repository.getMediaUrl(workout.coverImageId)} /><div><h3>{workout.title}</h3><p>{workout.exercises.length} exercícios</p></div><span className="workout-card-action">Abrir ficha<ArrowUpRight size={21} aria-hidden="true" /></span></Link></article>;
}
