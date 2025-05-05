class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        if (!array.length) return null;
        array = Array.from(new Set(array));
        array.sort((a, b) => a - b);
        return this.buildBST(array, 0, array.length - 1);
    }

    buildBST(arr, start, end) {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);
        node.left = this.buildBST(arr, start, mid - 1);
        node.right = this.buildBST(arr, mid + 1, end);
        return node;
    }

    insert(value) {
        this.root = this._insertRec(this.root, value);
    }

    _insertRec(node, value) {
        if (node === null) {
            return new Node(value);
        }
        if (value < node.data) {
            node.left = this._insertRec(node.left, value);
        } else if (value > node.data) {
            node.right = this._insertRec(node.right, value);
        }
        return node;
    }

    deleteItem(value) {
        this.root = this._deleteRec(this.root, value);
    }

    _deleteRec(node, value) {
        if (node === null) return null;

        if (value < node.data) {
            node.left = this._deleteRec(node.left, value);
        } else if (value > node.data) {
            node.right = this._deleteRec(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                return null;
            }
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }
            let minLargerNode = this._findMin(node.right);
            node.data = minLargerNode.data;
            node.right = this._deleteRec(node.right, minLargerNode.data);
        }
        return node;
    }

    _findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    find(value) {
        return this._findRec(this.root, value);
    }

    _findRec(node, value) {
        if (node === null) return null;
        if (node.data === value) return node;
        return value < node.data
            ? this._findRec(node.left, value)
            : this._findRec(node.right, value);
    }

    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required');
        }

        // Iterative implementation using a queue
        const queue = [this.root];
        while (queue.length) {
            const node = queue.shift();
            callback(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    /* 
    // Alternatively, you can implement a recursive version like below:

    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required');
        }
        
        const traverseLevel = (nodes) => {
            if (!nodes.length) return;
            const nextNodes = [];
            for (const node of nodes) {
                callback(node);
                if (node.left) nextNodes.push(node.left);
                if (node.right) nextNodes.push(node.right);
            }
            traverseLevel(nextNodes);
        };

        traverseLevel([this.root]);
    }
    */

    inOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required');
        }
        const traverse = node => {
            if (node === null) return;
            traverse(node.left);
            callback(node);
            traverse(node.right);
        };
        traverse(this.root);
    }

    preOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required');
        }
        const traverse = node => {
            if (node === null) return;
            callback(node);
            traverse(node.left);
            traverse(node.right);
        };
        traverse(this.root);
    }

    postOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required');
        }
        const traverse = node => {
            if (node === null) return;
            traverse(node.left);
            traverse(node.right);
            callback(node);
        };
        traverse(this.root);
    }

    height(value) {
        const node = this.find(value);
        if (!node) return null;

        const computeHeight = node => {
            if (node === null) return -1;
            return (
                1 +
                Math.max(computeHeight(node.left), computeHeight(node.right))
            );
        };

        return computeHeight(node);
    }

    depth(value) {
        let current = this.root;
        let depth = 0;
        while (current !== null) {
            if (current.data === value) {
                return depth;
            }
            current = value < current.data ? current.left : current.right;
            depth++;
        }
        return null;
    }

    isBalanced() {
        const check = node => {
            if (node === null) return 0;
            const leftHeight = check(node.left);
            if (leftHeight === -1) return -1;
            const rightHeight = check(node.right);
            if (rightHeight === -1) return -1;
            if (Math.abs(leftHeight - rightHeight) > 1) return -1;
            return Math.max(leftHeight, rightHeight) + 1;
        };
        return check(this.root) !== -1;
    }

    rebalance() {
        const nodesData = [];
        this.inOrder(node => nodesData.push(node.data));
        this.root = this.buildTree(nodesData);
    }
}
