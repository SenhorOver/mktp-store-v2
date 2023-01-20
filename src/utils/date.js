
export function formatDate(date){
  if(!date) return null
  const data = new Date(date)
  return data.toLocaleString('pt-BR', { weekDay: 'long', year: 'numeric', month: 'long', day:'numeric', timeZone: 'America/Sao_Paulo'})
}