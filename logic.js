// თამაშის მონაცემები
const gameState = {
    player: { hp: 100, mp: 50, gold: 0, lvl: 1, class: null, clothes: 'Default' },
    currentLoc: 0,
    missionProgress: 0
};

const enemies = [
    { name: "გობლინი მძარცველი", hp: 40, attack: 8, reward: 20 },
    { name: "ბოროტი ჯადოქარი", hp: 60, attack: 15, reward: 50 },
    { name: "ნაზგულის ჩრდილი", hp: 100, attack: 25, reward: 150 }
];

// მაღაზია (ტანისამოსი და იარაღი)
const shopItems = [
    { name: "ფოლადის აბჯარი", cost: 100, bonus: "DEF+10" },
    { name: "ცეცხლოვანი მოსასხამი", cost: 300, bonus: "STR+20" },
    { name: "ლეგენდარული სკინი", cost: 1000, bonus: "MAX-HP+100" }
];

// ეკრანის განახლება
function updateUI() {
    document.getElementById('hp').innerText = gameState.player.hp;
    document.getElementById('gold').innerText = gameState.player.gold;
    document.getElementById('lvl').innerText = gameState.player.lvl;
    document.getElementById('mission-bar').style.width = gameState.missionProgress + "%";
}

// ბრძოლა (PUBG სტილი: "ზონა" და "სისწრაფე")
function startBattle() {
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    const screen = document.getElementById('screen-display');
    screen.classList.add('battle-scene');
    
    screen.innerHTML = `
        <div>
            <h1 style="color:red">⚠️ საფრთხე: ${enemy.name}!</h1>
            <p>მტრის HP: ${enemy.hp}</p>
            <div id="battle-log">ბრძოლა იწყება...</div>
        </div>
    `;

    const btnArea = document.getElementById('action-buttons');
    btnArea.innerHTML = `
        <button onclick="attackEnemy('${enemy.name}', ${enemy.hp})">🗡️ დარტყმა</button>
        <button onclick="useMagic()">🪄 მაგია</button>
    `;
}

function attackEnemy(name, hp) {
    // აქ წავა ბრძოლის ლოგიკა, ქოინების დარიცხვა და შემდეგ ტურში გადასვლა
    gameState.player.gold += 50;
    gameState.missionProgress += 20;
    updateUI();
    alert("გაიმარჯვე! მიიღე 50 ქოინი.");
    if (gameState.missionProgress >= 100) {
        alert("შენ მიაღწიე სასახლეს და გადაარჩინე გოგონა! 🎉");
    }
}

// საწყისი ეკრანი
window.onload = () => {
    updateUI();
    document.getElementById('screen-display').innerHTML = `
        <div>
            <h1>კეთილი იყოს შენი მობრძანება, მებრძოლო!</h1>
            <p>გოგონა სასახლეშია ჩაკეტილი. გაიარე 6 ლოკაცია და გადაარჩინე ის.</p>
            <button onclick="startBattle()">დაიწყე პირველი ბრძოლა</button>
        </div>
    `;
};
