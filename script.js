
const recipeData = {
    name: "Pancakes",
    baseServings: 2,
    ingredients: [
        { name: "Flour", baseAmount: 1, unit: "cup" },
        { name: "Milk", baseAmount: 1, unit: "cup" },
        { name: "Egg", baseAmount: 1, unit: "pc" },
        { name: "Sugar", baseAmount: 2, unit: "tbsp" }
    ]
};

let currentServings = 2;

const ingredientsContainer = document.getElementById('ingredients-container');
const servingButtons = document.querySelectorAll('.serving-btn');

function playClickSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.08);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
  }
}

function renderIngredients(servings) {
    const multiplier = servings / recipeData.baseServings;

    const ingredientsHTML = recipeData.ingredients.map(ingredient => {
        let scaledAmount = ingredient.baseAmount * multiplier;
        
        scaledAmount = Number.isInteger(scaledAmount) ? scaledAmount : scaledAmount.toFixed(1);

        return `
            <div class="ingredient-row">
                <span class="ingredient-name">${ingredient.name}</span>
                <span class="ingredient-amount">${scaledAmount} ${ingredient.unit}${scaledAmount > 1 && ingredient.unit !== 'cup' ? 's' : ''}</span>
            </div>
        `;
    }).join('');

    ingredientsContainer.innerHTML = ingredientsHTML;
}

servingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        playClickSound();

        servingButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentServings = parseInt(e.target.getAttribute('data-servings'));
        renderIngredients(currentServings);
    });
});

renderIngredients(currentServings);
