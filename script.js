window.addEventListener('load', addGood);

window.addEventListener(`load`, function(){
    var goodsPanels = document.querySelectorAll('.goods-panel');
    goodsPanels.forEach(function(goodsPanel) {
        var removeButton = goodsPanel.querySelector('.cancel');
        removeButton.addEventListener('click', function() {
            goodsPanel.remove();
        });
    });
});

function addGood() {
    var addButton = document.getElementById('add_button');
    var searchBar = document.getElementById('search_bar');
    var goodsContainer = document.querySelector('.goods');

    addButton.addEventListener('click', function() {
        var productName = searchBar.value.trim();

        if (productName !== '') {
            var newGoodsPanel = createGoodsPanel();

            var leftSpan = newGoodsPanel.querySelector('.left');
            leftSpan.textContent = productName;

            // takes 2 times to clicke for toggling
            var boughtButton = newGoodsPanel.querySelector('.bought');
            boughtButton.addEventListener('click', function() {
                var goodsPanels = document.querySelectorAll('.goods-panel');
                goodsPanels.forEach(function(goodsPanel) {
                var boughtButton = goodsPanel.querySelector('.bought');
                 boughtButton.addEventListener('click', function() {
                togglePurchase(goodsPanel);
        });
    });
            });

            var removeButton = newGoodsPanel.querySelector('.cancel');
            removeButton.addEventListener('click', function() {
            removeGood(newGoodsPanel);
            });

            goodsContainer.appendChild(newGoodsPanel);

            searchBar.value = '';
            searchBar.focus();
        }
    });
}

function createGoodsPanel() {
    var goodsPanel = document.createElement('section');
    goodsPanel.classList.add('goods-panel');
    
    var leftSpan = document.createElement('span');
    leftSpan.classList.add('left');
    leftSpan.textContent = 'Печиво';
    goodsPanel.appendChild(leftSpan);

    var centerDiv = document.createElement('div');
    centerDiv.classList.add('center');

    var minusButton = document.createElement('button');
    minusButton.classList.add('minus');
    minusButton.textContent = '-';
    minusButton.setAttribute('data-tooltip', 'Зменшити к-сть продуктів');
    centerDiv.appendChild(minusButton);

    var counterSpan = document.createElement('span');
    counterSpan.classList.add('counter');
    counterSpan.textContent = '1';
    centerDiv.appendChild(counterSpan);

    var plusButton = document.createElement('button');
    plusButton.classList.add('plus');
    plusButton.textContent = '+';
    plusButton.setAttribute('data-tooltip', 'Збільшити к-сть продуктів');
    centerDiv.appendChild(plusButton);

    goodsPanel.appendChild(centerDiv);

    var rightDiv = document.createElement('div');
    rightDiv.classList.add('right');

    var statusP = document.createElement('p');
    statusP.classList.add('status');
    statusP.textContent = 'Не куплено';
    statusP.setAttribute('data-tooltip', "Товар занесено в категорію 'Куплено'");
    rightDiv.appendChild(statusP);

    var boughtButton = document.createElement('button');
    boughtButton.classList.add('bought');
    boughtButton.textContent = 'Купити товар';
    boughtButton.setAttribute('data-tooltip', "Товар занесено в категорію 'Залишилося'");
    boughtButton.addEventListener('click', function() {
        togglePurchase(goodsPanel);
    });
    rightDiv.appendChild(boughtButton);

    var cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel');
    cancelButton.textContent = 'Х';
    cancelButton.setAttribute('data-tooltip', "Скасувати дії");
    cancelButton.addEventListener('click', function() {
        goodsPanel.remove();
    });
    rightDiv.appendChild(cancelButton);

    goodsPanel.appendChild(rightDiv);

    return goodsPanel;
}