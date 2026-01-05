class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
        this.x = 0;
        this.y = 0;
        this.el = null;
    }
}

let root = null;
const container = document.getElementById("tree-container");

/* ================== UTILS ================== */
function height(n) {
    return n ? n.height : 0;
}

function updateHeight(n) {
    n.height = Math.max(height(n.left), height(n.right)) + 1;
}

function balance(n) {
    return n ? height(n.left) - height(n.right) : 0;
}

function removeNodeDOM(node) {
    if (node && node.el) {
        node.el.remove();
        node.el = null;
    }
}

/* ================== ROTATIONS ================== */
function rotateRight(y) {
    const x = y.left;
    const t = x.right;

    x.right = y;
    y.left = t;

    updateHeight(y);
    updateHeight(x);

    return x;
}

function rotateLeft(x) {
    const y = x.right;
    const t = y.left;

    y.left = x;
    x.right = t;

    updateHeight(x);
    updateHeight(y);

    return y;
}

/* ================== INSERT ================== */
function insert(node, value) {
    if (!node) return new Node(value);

    if (value < node.value)
        node.left = insert(node.left, value);
    else if (value > node.value)
        node.right = insert(node.right, value);
    else
        return node;

    updateHeight(node);
    const b = balance(node);

    if (b > 1 && value < node.left.value) return rotateRight(node);
    if (b < -1 && value > node.right.value) return rotateLeft(node);

    if (b > 1 && value > node.left.value) {
        node.left = rotateLeft(node.left);
        return rotateRight(node);
    }

    if (b < -1 && value < node.right.value) {
        node.right = rotateRight(node.right);
        return rotateLeft(node);
    }

    return node;
}

/* ================== DELETE ================== */
function minValueNode(node) {
    while (node.left) node = node.left;
    return node;
}

function deleteNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
        node.left = deleteNode(node.left, value);
    }
    else if (value > node.value) {
        node.right = deleteNode(node.right, value);
    }
    else {
        if (!node.left && !node.right) {
            removeNodeDOM(node);
            return null;
        }

        if (!node.left || !node.right) {
            const child = node.left || node.right;
            removeNodeDOM(node);
            return child;
        }

        const successor = minValueNode(node.right);
        node.value = successor.value;
        node.el.textContent = successor.value;
        node.right = deleteNode(node.right, successor.value);
    }

    updateHeight(node);
    const b = balance(node);

    if (b > 1 && balance(node.left) >= 0) return rotateRight(node);

    if (b > 1 && balance(node.left) < 0) {
        node.left = rotateLeft(node.left);
        return rotateRight(node);
    }

    if (b < -1 && balance(node.right) <= 0) return rotateLeft(node);

    if (b < -1 && balance(node.right) > 0) {
        node.right = rotateRight(node.right);
        return rotateLeft(node);
    }

    return node;
}

/* ================== POSITIONING ================== */
function setPositions(node, depth = 0, minX = 0, maxX = container.clientWidth) {
    if (!node) return;

    node.x = (minX + maxX) / 2;
    node.y = depth * 90 + 70;

    setPositions(node.left, depth + 1, minX, node.x);
    setPositions(node.right, depth + 1, node.x, maxX);
}

/* ================== RENDER ================== */
function render(root) {
    document.querySelectorAll(".line").forEach(l => l.remove());

    function traverse(node) {
        if (!node) return;

        if (!node.el) {
            node.el = document.createElement("div");
            node.el.className = "node";
            container.appendChild(node.el);
        }

        node.el.textContent = node.value;
        node.el.style.left = `${node.x - 22}px`;
        node.el.style.top = `${node.y - 22}px`;

        if (node.left) drawLine(node, node.left);
        if (node.right) drawLine(node, node.right);

        traverse(node.left);
        traverse(node.right);
    }

    traverse(root);
}

function drawLine(p, c) {
    const line = document.createElement("div");
    line.className = "line";

    const dx = c.x - p.x;
    const dy = c.y - p.y;

    line.style.width = `${Math.hypot(dx, dy)}px`;
    line.style.left = `${p.x}px`;
    line.style.top = `${p.y}px`;
    line.style.transform = `rotate(${Math.atan2(dy, dx) * 180 / Math.PI}deg)`;

    container.appendChild(line);
}

/* ================== BUTTONS ================== */
function insertValue() {
    const val = Number(document.getElementById("valueInput").value);
    if (isNaN(val)) return;

    root = insert(root, val);
    setPositions(root);
    render(root);
}

function deleteValue() {
    const val = Number(document.getElementById("valueInput").value);
    if (isNaN(val)) return;

    root = deleteNode(root, val);
    setPositions(root);
    render(root);
}

function resetTree() {
    root = null;
    container.innerHTML = "";
}
