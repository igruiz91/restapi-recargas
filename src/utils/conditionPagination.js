export default function (title) {
  if(!title) return {}
  else{
    return {
      title : { $regex: new RegExp(title), $options: "ig"}
    }
  }
}
