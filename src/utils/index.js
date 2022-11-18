

export const getCurDate=()=>{
    const d=new Date()
    const years=d.getFullYear()
    const month=d.getMonth()<10?`0${d.getMonth()}`:d.getMonth()
    const date=d.getDate()<10?`0${d.getDate()}`:d.getDate()
    return `${years}${month}${date}`
}