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

const deleteNode = (root = null, value) => {
  if (root == null) {
    return root;
  }
};

prettyPrint(tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
root = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(insertNode(root, 593));
prettyPrint(root);
