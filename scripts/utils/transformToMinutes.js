export default function transformToMinutes(a){
  const minutes = Math.trunc(a / 60);
  const seconds = a % 60;

  return minutes ? `${minutes} min ${seconds} s` : `${seconds} s`;
}
