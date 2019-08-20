export const downloadMusicFile = (data, filename) => {
  if (!data) return;
  let blob = new Blob([data], {
    type: 'application/vnd.ms-exce'
  })
  let link = document.createElement('a')
  let fileName = `${filename}.mp3`
  link.href = window.URL.createObjectURL(blob)
  link.download = decodeURIComponent(fileName)
  link.click()
};