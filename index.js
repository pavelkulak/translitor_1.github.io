function transliterate(word) {
    const lettersMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
        'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    return word.split('').map(letter => {
        const lowerCaseLetter = letter.toLowerCase();
        const translitLetter = lettersMap[lowerCaseLetter] || letter;
        return letter === letter.toUpperCase()
            ? translitLetter.charAt(0).toUpperCase() + translitLetter.slice(1)
            : translitLetter;
    }).join('');
}

function updateRowNumber() {
    const rows = document.querySelectorAll("tr.last-tr");
    rows.forEach((row, index) => {
        const num = row.querySelector(".num");
        if (num) {
            num.textContent = index + 2;
        }
    });
}

function transliterateCLick() {
    let inputValue = input.value;


    const tr = document.createElement("tr");
    tr.className = "last-tr";

    const td1 = document.createElement("td");
    td1.className = "column1";

    const td2 = document.createElement("td");
    td2.className = "column2";

    const num = document.createElement("span");
    num.className = "num";

    const div1 = document.createElement("div");
    div1.className = "cell-content1";

    const div2 = document.createElement("div");
    div2.className = "cell-content2";


    const button2 = document.createElement("button");
    button2.className = "delete-button2";



    if (inputValue.length > 9) {

        inputValue = inputValue.slice(0, 9) + "...";
        div1.textContent = inputValue;
        div2.textContent = transliterate(inputValue);
        const tooltip1 = document.createElement("div");
        tooltip1.className = "tooltip";
        tooltip1.innerText = input.value;
        div1.appendChild(tooltip1);
        div1.addEventListener("mouseenter", () => {
            tooltip1.style.display = "block";
        });
        div1.addEventListener("mouseleave", () => {
            tooltip1.style.display = "none";
        });

        const tooltip2 = document.createElement("div");
        tooltip2.className = "tooltip";
        tooltip2.innerText = transliterate(input.value);
        div2.appendChild(tooltip2);
        div2.addEventListener("mouseenter", () => {
            tooltip2.style.display = "block";
        });
        div2.addEventListener("mouseleave", () => {
            tooltip2.style.display = "none";
        });
    } else {

        div1.textContent = inputValue;
        div2.textContent = transliterate(inputValue);
    }
    if (!inputValue) return;





    const resetBtn = document.querySelector(".reset-button");
    resetBtn.addEventListener("click", () => {
        const rowsToRemove = document.querySelectorAll("tr.last-tr");
        rowsToRemove.forEach(row => row.remove());
    });

    div1.prepend(num);
    td1.appendChild(div1);
    td2.appendChild(div2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    div2.appendChild(button2);
    tBody.appendChild(tr);

    button2.addEventListener("click", () => {
        tr.remove();
        updateRowNumber();
    });

    input.value = '';
    updateRowNumber();
}

const input = document.querySelector("input");
const inputBtn = document.querySelector(".input-button");
const tBody = document.querySelector("tbody");

inputBtn.addEventListener("click", transliterateCLick);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        transliterateCLick();
    }
});