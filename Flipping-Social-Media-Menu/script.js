document.addEventListener('DOMContentLoaded', function () {
    const socialItems = document.querySelectorAll('.social-item')

    socialItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault()
            console.log('Clicked on: ' + this.querySelector('.social-name').textContent)
        })
    })
})