
 export function compareByName (i, j) {
  if(i.name < j.name){
    return -1
  }
  else if(i.name > j.name){
    return 1
  }
  return 0
}