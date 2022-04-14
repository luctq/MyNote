
export const fetchLogin = async (username, password) => {
  const res = await fetch('http://192.168.113.107:8000', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({username, password})
  })
  const result  = await res.json()
  return result
}