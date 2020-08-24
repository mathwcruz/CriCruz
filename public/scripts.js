const modalOverlay = document.querySelector('.modal_overlay')
const videos = document.querySelectorAll('.video')

for (let video of videos) {
    video.addEventListener("click", function(){
        const videoID = video.getAttribute("id")
        window.location.href = `/video?id=${videoID}` /* quando clicar no video, o usuário será redirecionado para a aba que contem o video */
    })
}
