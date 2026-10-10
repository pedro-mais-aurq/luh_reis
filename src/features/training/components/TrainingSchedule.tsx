import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { TrainingSchedule as Schedule } from '../types/program';
const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
export function TrainingSchedule({ schedules }: { schedules: Schedule[] }) {
  const [frequency, setFrequency] = useState(schedules[0].id);
  const [weekNumber, setWeekNumber] = useState(1);
  const schedule = schedules.find(s => s.id === frequency) || schedules[0];
  const week = schedule.weeks.find(w => w.week === weekNumber) || schedule.weeks[0];
  return <section className="training-schedule" id="periodizacao" aria-labelledby="schedule-title"><div className="training-section-heading"><div><p className="eyebrow">UM OLHAR PARA A SEMANA</p><h2 id="schedule-title">A organização dos treinos.</h2></div><p>Escolha a frequência e a semana.</p></div><div className="frequency-options" role="group" aria-label="Frequência semanal">{schedules.map(s => <button key={s.id} type="button" aria-pressed={s.id === schedule.id} onClick={() => setFrequency(s.id)}>{s.daysPerWeek} dias</button>)}</div><div className="week-options" role="group" aria-label="Semana do modelo">{schedule.weeks.map(w => <button key={w.week} type="button" aria-pressed={w.week === week.week} onClick={() => setWeekNumber(w.week)}>Semana {w.week}</button>)}</div><div className="schedule-days" aria-label={`${schedule.daysPerWeek} dias, semana ${week.week}`}>{week.days.map(d => <article key={d.day} className={d.workoutId ? 'schedule-day planned' : 'schedule-day'}><h3>{days[d.day]}</h3>{d.workoutId ? <Link to={`/treinos/${d.workoutId}`}>Treino <strong>{d.workoutId.toUpperCase()}</strong><span>Abrir ficha</span></Link> : <p aria-label="Sem treino indicado na fonte">—</p>}</article>)}</div><p className="schedule-source">“—” indica um campo vazio na fonte. A frequência deve ser definida com a profissional.</p></section>;
}
