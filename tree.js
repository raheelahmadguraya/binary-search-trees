const node = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const buildTree = (arr, start, end) => {
  if (start > end) return null;
  let mid = parseInt((start + end) / 2);
  let node1 = node(arr[mid]);

  node1.left = buildTree(arr, start, mid - 1);
  node1.right = buildTree(arr, mid + 1, end);

  return node1;
};

const tree = (array) => {
  //Sort array and remove duplicates
  array.sort(function (a, b) {
    return a - b;
  });
  let arr = [...new Set(array)];
  let n = arr.length;
  const root = buildTree(arr, 0, n - 1);

  return root;
};

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const insertNode = (root = null, value) => {
  if (root == null) {
    root = node(value);
    return root;
  }

  if (value == root.data) {
    return root;
  }

  if (value < root.data) {
    root.left = insertNode(root.left, value);
  } else if (value > root.data) {
    root.right = insertNode(root.right, value);
  }
  return root;
};

const minValue = (root) => {
  let minv = root.data;
  while (root.left != null) {
    minv = root.left.data;
    root = root.left;
  }
  return minv;
};

const deleteNode = (root = null, data) => {
  if (root == null) {
    return root;
  }

  if (data < root.data) {
    root.left = deleteNode(root.left, data);
  } else if (data > root.data) {
    root.right = deleteNode(root.right, data);
  } else {
    if (root.left == null) {
      return root.right;
    } else if (root.right == null) {
      return root.left;
    }
    root.data = minValue(root.right);
    root.right = deleteNode(root.right, root.value);
  }
  return root;
};

const findNode = (root = null, data) => {
  if (root == null) {
    return 'Tree node does not exist';
  }
  if (data == root.data) {
    return root;
  } else if (data < root.data) {
    const foundRoot = findNode(root.left, data);
    return foundRoot;
  } else if (data > root.data) {
    const foundRoot = findNode(root.right, data);
    return foundRoot;
  } else {
    return 'Tree node does not exist';
  }
};

const queue = (node) => {
  const items = [node];

  const enqueue = (item) => {
    items.push(item);
    return item + ' inserted';
  };

  const dequeue = () => {
    const item = items[0];
    items.splice(0, 1);
    return item;
  };

  return {
    items,
    enqueue,
    dequeue,
  };
};

const levelOrder = (root = null, func = null) => {
  let levelOrderBST = [];
  if (root == null) return;
  let Q = queue(root);
  while (Q.items.length > 0) {
    const current = Q.dequeue();
    if (current.left != null) Q.enqueue(current.left);
    if (current.right != null) Q.enqueue(current.right);
    levelOrderBST.push(current);
  }
  return levelOrderBST;
};

const inorder = (root = null) => {
  if (root == null) return;
  let stack = [];
  let currentNode = root;
  let inorderBST = [];

  while (stack.length != 0 || currentNode != null) {
    if (currentNode != null) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    } else {
      currentNode = stack.pop();
      console.log(currentNode.data);
      inorderBST.push(currentNode.data);
      currentNode = currentNode.right;
    }
  }

  return inorderBST;
};

const preorder = (root = null) => {
  if (root == null) return;
  let stack = [];
  let currentNode = root;
  stack.push(root);
  let preorderBST = [];

  while (stack.length != 0) {
    currentNode = stack.pop();
    console.log(currentNode.data);
    preorderBST.push(currentNode.data);
    if (currentNode.right != null) stack.push(currentNode.right);
    if (currentNode.left != null) stack.push(currentNode.left);
  }

  return preorderBST;
};

const postorder = (root = null) => {
  if (root == null) return;
  let mainStack = [];
  let rightStack = [];
  let currentNode = root;
  let postorderBST = [];

  while (mainStack.length != 0 || currentNode != null) {
    if (currentNode != null) {
      if (currentNode.right != null) {
        rightStack.push(currentNode.right);
      }
      mainStack.push(currentNode);
      currentNode = currentNode.left;
    } else {
      currentNode = mainStack[mainStack.length - 1];
      if (
        rightStack.length != 0 &&
        currentNode.right == rightStack[rightStack.length - 1]
      ) {
        currentNode = rightStack.pop();
      } else {
        console.log(currentNode.data);
        postorderBST.push(currentNode.data);
        mainStack.pop();
        currentNode = null;
      }
    }
  }
  return postorderBST;
};

const height = (node = null) => {
  if (node == null) return 0;

  return Math.max(height(node.left), height(node.right)) + 1;
};

const depth = (root, node) => {
  if (root == null) return -1;

  let dist = -1;

  if (
    root.data == node ||
    (dist = depth(root.left, node)) >= 0 ||
    (dist = depth(root.right, node)) >= 0
  ) {
    return dist + 1;
  }
  return dist;
};

const isBalanced = (root) => {
  if (root == null) return true;

  let leftTree = height(root.left);
  let rightTree = height(root.right);

  if (
    Math.abs(leftTree - rightTree) <= 1 &&
    isBalanced(root.left) == true &&
    isBalanced(root.right) == true
  )
    return true;

  return false;
};

const rebalance = (root) => {
  if (isBalanced(root) == false) {
    root = tree(inorder(root));
    return root;
  } else {
    return 'Tree is balanced';
  }
};

root = tree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 56, 85, 96, 115, 153,
]);
prettyPrint(root);
console.log(height(root));
console.log(depth(root, findNode(6345)));
console.log(isBalanced(root));
insertNode(root, 101);
insertNode(root, 102);
insertNode(root, 103);
insertNode(root, 104);
insertNode(root, 105);
insertNode(root, 106);
insertNode(root, 107);
insertNode(root, 108);
insertNode(root, 109);
insertNode(root, 110);
prettyPrint(root);
console.log(isBalanced(root));
root = rebalance(root);
prettyPrint(root);
