import { Tree } from './Tree';

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    console.log(prefix + (isLeft ? '├── ' : '└── ') + node.data);
    prettyPrint(node.left, prefix + (isLeft ? '│   ' : '    '), true);
    prettyPrint(node.right, prefix + (isLeft ? '│   ' : '    '), false);
};

// Функція для генерації масиву випадкових чисел (розмір count, максимум max)
const generateRandomNumbers = (count, max = 100) => {
    const arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(Math.floor(Math.random() * max));
    }
    return arr;
};

// Створення двійкового дерева пошуку (припускаємо, що клас Tree із підтримкою методів insert,
// levelOrder, preOrder, inOrder, postOrder, isBalanced та rebalance вже оголошений)
const randomNumbers = generateRandomNumbers(10, 100);
const tree = new Tree(randomNumbers);

console.log('Початкове дерево:');
prettyPrint(tree.root);
console.log('Чи збалансоване дерево? ' + tree.isBalanced());

// Друкуємо обходи дерева
const values = [];
console.log(
    'Обхід по рівнях:',
    tree.levelOrder(node => values.push(node.data))
);
console.log(
    'Обхід у порядку preOrder:',
    tree.preOrder(node => node.data)
);
console.log(
    'Обхід у порядку inOrder:',
    tree.inOrder(node => node.data)
);
console.log(
    'Обхід у порядку postOrder:',
    tree.postOrder(node => node.data)
);

// Вставляємо кілька чисел > 100 для розбалансування дерева
const numbersToAdd = [101, 150, 200, 250, 300, 350];
numbersToAdd.forEach(num => tree.insert(num));

console.log('\nПісля додавання чисел > 100:');
prettyPrint(tree.root);
console.log('Чи збалансоване дерево? ' + tree.isBalanced());

// Збалансуємо дерево
tree.rebalance();

console.log('\nПісля ребалансування:');
prettyPrint(tree.root);
console.log('Чи збалансоване дерево? ' + tree.isBalanced());

// Друкуємо обходи дерева знову
console.log('Обхід по рівнях:', tree.levelOrder());
console.log('Обхід у порядку preOrder:', tree.preOrder());
console.log('Обхід у порядку inOrder:', tree.inOrder());
console.log('Обхід у порядку postOrder:', tree.postOrder());
