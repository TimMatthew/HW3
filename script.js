window.addEventListener('load', addGood);
// Optimize below
window.addEventListener(`load`, function(){
    var goodsPanels = document.querySelectorAll('.goods-panel');
    goodsPanels.forEach(function(goodsPanel) {
        var removeButton = goodsPanel.querySelector('.cancel');
        removeButton.addEventListener('click', function() {
            goodsPanel.remove();
        });
    });
});

//Optimize below
window.addEventListener('load', function() {
    var goodsPanels = document.querySelectorAll('.goods-panel');

    goodsPanels.forEach(function(goodsPanel) {
        var boughtButton = goodsPanel.querySelector('.bought');
        boughtButton.addEventListener('click', function() {
            togglePurchase(goodsPanel);
        });
    });
});

// product name editing
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('left')) {
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = e.target.textContent;
        inputField.classList.add('left'); // add 'left' class to the input

        inputField.addEventListener('blur', function() { 
            var spanElement = document.createElement('span');
            spanElement.textContent = inputField.value;
            spanElement.classList.add('left'); 
            inputField.parentNode.replaceChild(spanElement, inputField);
        });

        e.target.parentNode.replaceChild(inputField, e.target);
        inputField.focus();
    }
});


window.addEventListener('load', editQuantity());
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

            var boughtButton = newGoodsPanel.querySelector('.bought');
                boughtButton.addEventListener('click', function() {
                togglePurchase(newGoodsPanel);
            });

            var removeButton = newGoodsPanel.querySelector('.cancel');
                removeButton.addEventListener('click', function() {
                newGoodsPanel.remove();
            });

            goodsContainer.appendChild(newGoodsPanel);

            searchBar.value = '';
            searchBar.focus();
        }
    });
}

function togglePurchase(goodsPanel) {

    var status = goodsPanel.querySelector('.status');
    var centerDiv = goodsPanel.querySelector('.center');
    var cancelButton = goodsPanel.querySelector('.cancel');
    var leftSpan = goodsPanel.querySelector('.left');
    var boughtButton = goodsPanel.querySelector('.bought');

    if (boughtButton.textContent === 'Купити товар') {
        status.textContent = 'Куплено'
        centerDiv.style.visibility = 'hidden';
        cancelButton.style.visibility = 'hidden';
        leftSpan.style.textDecoration = 'line-through';
        boughtButton.textContent = 'Скасувати покупку';
    } else {
        status.textContent = 'Не куплено'
        centerDiv.style.visibility = 'visible';
        cancelButton.style.visibility = 'visible';
        leftSpan.style.textDecoration = 'none';
        boughtButton.textContent = 'Купити товар';
    }
}

function editQuantity(){

    var goodsContainer = document.querySelector('.goods');
    goodsContainer.addEventListener('click', function(e) {
        if (e.target && e.target.matches('.plus')) {
            var goodsPanel = e.target.closest('.goods-panel');
            var counterSpan = goodsPanel.querySelector('.counter');
            var count = parseInt(counterSpan.textContent, 10);
            counterSpan.textContent = count + 1;
            
            var minusButton = goodsPanel.querySelector('.minus');
            if (count + 1 > 1) {
                minusButton.style.display = `inline-block`;
            }
        }
            
        if (e.target && e.target.matches('.minus')) {
            var goodsPanel = e.target.closest('.goods-panel');
            var counterSpan = goodsPanel.querySelector('.counter');
            var count = parseInt(counterSpan.textContent, 10);
            if (count - 1 >= 1) {
                counterSpan.textContent = count - 1;
            }
    
            var minusButton = goodsPanel.querySelector('.minus');
            if (count - 1 == 1) {
                minusButton.style.display = `none`;
            }
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
    counterSpan.style.margin = '4px';
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
    rightDiv.appendChild(boughtButton);

    var cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel');
    cancelButton.textContent = 'Х';
    cancelButton.setAttribute('data-tooltip', "Скасувати дії");
    rightDiv.appendChild(cancelButton);

    goodsPanel.appendChild(rightDiv);
    return goodsPanel;
}