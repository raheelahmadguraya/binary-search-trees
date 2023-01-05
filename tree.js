const node = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const buildTree = (arr, start, end) => {
  if (start > end) return null;
  let mid = parseInt((start + end) / 2);
  console.log(mid);
  let node1 = node(arr[mid]);
  console.log(node1);

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

//console.log(tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));

prettyPrint(tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
