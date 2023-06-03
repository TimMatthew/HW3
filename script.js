window.onload = addGood;

function addGood(){
    var addButton = document.getElementById('add_button');
    var searchBar = document.getElementById('search_bar');
    var goodsContainer = document.querySelector('.goods');

    addButton.addEventListener('click', function() {
        var productName = searchBar.value.trim();

        if (productName !== '') {
            var existingGoodsPanel = document.querySelector('.goods-panel');
            var newGoodsPanel = existingGoodsPanel.cloneNode(true);

            var leftSpan = newGoodsPanel.querySelector('.left');
            leftSpan.textContent = productName;

            goodsContainer.appendChild(newGoodsPanel);

            searchBar.value = '';
            searchBar.focus();
        }
    });   
}