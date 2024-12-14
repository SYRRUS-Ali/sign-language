let currentMatchIndex = -1; 
let matches = []; 
let lastQuery = '';

// Обработчик нажатия Enter
document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleSearch(); 
    }
});

// Обработчик нажатия кнопки Search
document.getElementById('search-button').addEventListener('click', function () {
    handleSearch(); 
});

function handleSearch() {
    const query = document.getElementById('search-input').value.trim();

    if (query === '') {
        alert('Введите текст для поиска.');
        return;
    }

    // Если запрос изменился, сбрасываем состояния
    if (query !== lastQuery) {
        lastQuery = query; 
        performSearch(query); 
    }
    if (matches.length > 0) {
        goToNextMatch(); 
    } else {
        alert('Совпадений не найдено.');
    }
}

function performSearch(query) {
    resetSearchState(); 
    const normalizedQuery = query.toLocaleLowerCase(); // нормализуем регистр

    const elements = document.body.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (
            isVisible(element) && 
            element.children.length === 0 &&
            element.textContent.toLocaleLowerCase().includes(normalizedQuery) // игнор регистра
        ) {
            findMatchesInElement(element, normalizedQuery);
        }
    }
}

function isVisible(element) {
    const style = window.getComputedStyle(element);
    return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0' &&
        element.offsetHeight > 0 &&
        element.offsetWidth > 0
    );
}

function resetSearchState() {
    matches = [];
    currentMatchIndex = -1; 
    resetHighlight(); 
}

function findMatchesInElement(element, query) {
    const regex = new RegExp(query, 'gi'); 
    const textNodes = getTextNodes(element);
    textNodes.forEach(node => {
        let match;
        const originalText = node.textContent;
        while ((match = regex.exec(originalText)) !== null) {
            matches.push({
                node,
                matchIndex: match.index,
                length: match[0].length,
                originalText,
                element,
            });
        }
    });
}

function getTextNodes(element) {
    const nodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let currentNode;
    while ((currentNode = walker.nextNode())) {
        nodes.push(currentNode);
    }
    return nodes;
}

function resetHighlight() {
    const spans = document.querySelectorAll('span.highlight');
    spans.forEach(span => {
        const parent = span.parentNode;
        parent.replaceChild(document.createTextNode(span.textContent), span);
        parent.normalize();
    });
}

function highlightText(match) {
    const range = document.createRange();
    range.setStart(match.node, match.matchIndex);
    range.setEnd(match.node, match.matchIndex + match.length);

    const span = document.createElement('span');
    span.style.backgroundColor = 'yellow';
    span.style.color = 'black';
    span.classList.add('highlight');
    span.textContent = match.originalText.substring(match.matchIndex, match.matchIndex + match.length); // Используем оригинальный текст
    range.deleteContents();
    range.insertNode(span);
}

function goToNextMatch() {
    if (matches.length > 0) {
        resetHighlight(); 
        currentMatchIndex = (currentMatchIndex + 1) % matches.length; // цикличный переход
        const match = matches[currentMatchIndex];
        highlightText(match);
        match.node.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); // прокрутка
    }
}