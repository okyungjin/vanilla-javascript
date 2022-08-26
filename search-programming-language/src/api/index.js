const API_END_POINT = 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev';

export const fetchLanguages = (keyword) => {
  if (!keyword) return [];
  return fetch(`${API_END_POINT}/languages?keyword=${keyword}`)
    .then(res => res.json())
    .then(data => data)
    .catch(() => { console.error('fail to fetch languages')})
}