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
  let inorderBST = [];
  let stack = [];
  let temp = root;
  while (temp != null || stack.length != 0) {
    if (temp != null) {
      stack.unshift(temp);
      temp = temp.left;
    } else {
      temp = stack[0];
      stack.shift();
      if (temp.data) {
        console.log(temp.data);
        inorderBST.push(temp.data);
      }
      temp = temp.right;
    }
  }
  return inorderBST;
};

const preorder = (root = null) => {
  if (root == null) return 'Nothing';
};
const postorder = (root = null) => {
  if (root == null) return 'Nothing';
};

const traverse = (method, root) => {};

root = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(root);
console.log(levelOrder(root));
console.log(inorder(root));
