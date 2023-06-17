window.addEventListener('click', addGood);
window.addEventListener(`click`, deleteGood);
window.addEventListener('load', editQuantity);
window.addEventListener('click', editGoodName);
window.addEventListener('load', updateQuantity);

window.addEventListener('load', function() {
    
    var goodsPanels = document.querySelectorAll('.goods-panel');
    goodsPanels.forEach(function(goodsPanel) {
        var boughtButton = goodsPanel.querySelector('.bought');
        boughtButton.addEventListener('click', function() {
            togglePurchase(goodsPanel);
        });
    });
});

function editGoodName(e) {
    if (e.target.classList.contains('left')) {

        var NewSpanName;
        var oldSpanName = e.target.textContent;
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = e.target.textContent;
        inputField.classList.add('left');

        inputField.addEventListener('blur', function() { 
            var spanElement = document.createElement('span');
            spanElement.textContent = inputField.value;
            NewSpanName = inputField.value;
            if(NewSpanName === ''){
                window.alert('Нічого не введено. Товару повернуто стару назву');
                NewSpanName=oldSpanName;
            }
            spanElement.classList.add('left'); 
            spanElement.textContent=NewSpanName;
            inputField.parentNode.replaceChild(spanElement, inputField);
            
            var indexTitles = document.querySelectorAll(`.index-text`);

            for(let indexTitle of indexTitles) {
                if(indexTitle.textContent.includes(oldSpanName)){
                    var indexNum = indexTitle.querySelector('.index-num');
                    var indexNumText = indexNum.textContent;
                    indexTitle.textContent = NewSpanName;
                    indexTitle.style.marginRight = "5px";
                    indexNum.textContent = indexNumText;
                    indexTitle.appendChild(indexNum);
                }
            }
        });

        e.target.parentNode.replaceChild(inputField, e.target);
        
        inputField.focus();
    }
}

function updateQuantity(e) {
    if (e.target.classList.contains('plus') || e.target.classList.contains('minus')) {
        var goodName = e.target.parentNode.parentNode.querySelector('.left').textContent;
        var goodCounter = e.target.parentNode.querySelector('.counter').textContent;

        var indexTitles = document.querySelectorAll('.index-text');
        indexTitles.forEach(function(indexTitle){

            var indexName = indexTitle.firstChild.textContent.trim();
            if(indexName === goodName){
                var indexNum = indexTitle.querySelector('.index-num');
                indexNum.textContent = goodCounter;
            }
        });
    }
}

function addGood() {

    var addButton = document.getElementById('add_button');
    var searchBar = document.getElementById('search_bar');
    var goodsContainer = document.querySelector('.goods');

    addButton.addEventListener('click', function() {
        var productName = searchBar.value.trim();
        var goods = document.querySelectorAll('.goods-panel');
        var isUnique=true;

        for(const good of goods){
            var goodName = good.querySelector('.left').textContent;
            if(productName === goodName){
                window.alert('Такий товар вже існує. Уведіть іншу назву');
                isUnique = false;
            }
        }

        if (productName !== '' && isUnique) {
            var newGoodsPanel = createGoodsPanel();

            var leftSpan = newGoodsPanel.querySelector('.left');
            leftSpan.textContent = productName;

            var boughtButton = newGoodsPanel.querySelector('.bought');
                boughtButton.addEventListener('click', function() {
                togglePurchase(newGoodsPanel);
            });



            goodsContainer.appendChild(newGoodsPanel);
            searchBar.value = '';
            searchBar.focus();

    var rest = document.querySelector('.rest');
    var indexText = document.createElement('span');
    indexText.classList.add('index-text');
    indexText.textContent = productName;
    indexText.style.marginRight = "5px";
    indexText.style.textAlign = "left";
    indexText.style.backgroundColor = "lightgray";
    indexText.style.padding = "6px";
    indexText.style.borderRadius = "10px";

    var indexNum = document.createElement('span');
    indexNum.classList.add('index-num');
    indexNum.textContent = '1';
    indexNum.style.backgroundColor = "rgb(227, 106, 0)";
    indexNum.style.color = "white";
    indexNum.style.padding = "3px";
    indexNum.style.borderRadius = "11px";

    indexText.appendChild(indexNum);
    rest.appendChild(indexText);
        }
    });
}

function deleteGood(e) {
    var removeButton = e.target.closest('.cancel');
    if (removeButton) {
      var goodsPanel = removeButton.closest('.goods-panel');
      goodsPanel.remove();
  
      var goodName = goodsPanel.querySelector('.left').textContent;
      var indexItems = document.querySelectorAll('.index-text');
  
      indexItems.forEach(function (indexItem) {
        var itemName = indexItem.firstChild.textContent.trim();
        if (itemName === goodName) {
          indexItem.remove();
        }
      });
    }
  }

function togglePurchase(goodsPanel) {

    var status = goodsPanel.querySelector('.status');
    var centerDiv = goodsPanel.querySelector('.center');
    var cancelButton = goodsPanel.querySelector('.cancel');
    var leftSpan = goodsPanel.querySelector('.left');
    var boughtButton = goodsPanel.querySelector('.bought');
    var goodsName = goodsPanel.querySelector('.left').textContent;
    var indexItems = document.querySelectorAll('.index-text');
    
    if (boughtButton.textContent === 'Купити товар') {
        status.textContent = 'Куплено'
        centerDiv.style.visibility = 'hidden';
        cancelButton.style.visibility = 'hidden';
        leftSpan.style.textDecoration = 'line-through';
        boughtButton.textContent = 'Скасувати покупку';

        
        
        indexItems.forEach(function(indexItem){
            
            var itemName = indexItem.firstChild.textContent.trim();
            if(itemName === goodsName){
                var replacedItem = indexItem;
                indexItem.remove();
                var replaceSection;
                replaceSection = document.querySelector('.taken');
                replaceSection.appendChild(replacedItem);
            }
        });
    } 
    else {
        status.textContent = 'Не куплено'
        centerDiv.style.visibility = 'visible';
        cancelButton.style.visibility = 'visible';
        leftSpan.style.textDecoration = 'none';
        boughtButton.textContent = 'Купити товар';

        indexItems.forEach(function(indexItem){
            if(indexItem.textContent.includes(goodsName)){
                var replacedItem = indexItem;
                indexItem.remove();
                var replaceSection;
                replaceSection = document.querySelector('.rest');
                replaceSection.append(replacedItem);
            }
        });
    }
}

function editQuantity() {
    var goodsContainer = document.querySelector('.goods');
    goodsContainer.addEventListener('click', function(e) {

        var goodsPanel, counterSpan, count, minusButton;

        if (e.target && e.target.matches('.plus')) {
            goodsPanel = e.target.closest('.goods-panel');
            counterSpan = goodsPanel.querySelector('.counter');
            count = parseInt(counterSpan.textContent, 10);
            counterSpan.textContent = count + 1;
            minusButton = goodsPanel.querySelector('.minus');
            minusButton.style.display = `inline-block`;
        }
            
        if (e.target && e.target.matches('.minus')) {
            goodsPanel = e.target.closest('.goods-panel');
            counterSpan = goodsPanel.querySelector('.counter');
            count = parseInt(counterSpan.textContent, 10);
            if (count - 1 >= 1) {
                counterSpan.textContent = count - 1;
            }
    
            minusButton = goodsPanel.querySelector('.minus');
            if (count - 1 == 1) {
                minusButton.style.display = `none`;
            }
        }
        
        updateQuantity(e);
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