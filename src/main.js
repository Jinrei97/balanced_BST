import { Node, Tree } from "./balancedBST.js";

function* generateNumber(top, toGen) {
  for (let i = 0; i < toGen; i++) {
    yield Math.floor(Math.random() * top);
  }
}

//const arr = [2, 3, 1, 7, 6, 4, 5, 0, 10, 15, 26, 0];
const arr = [4, 15, 3, 8, 5, 15, 26, 7, 0, 9, 6, 4];
const test = new Tree(arr);
console.log(test);

test.insert(20);
test.insert(4);
test.prettyPrint(test.root);

const deleteArr = [
  20, 40, 50, 30, 60, 70, 80, 100, 80, 25, 40, 60, 80, 15, 55, 75, 26,
];
const deleteTest = new Tree(deleteArr);
console.log("\nDELETE TESTS:");
// delete leaf
console.log("leaf:");
deleteTest.deleteItem(20);
// delete with 2 children
console.log("2 children");
deleteTest.deleteItem(70);
// delete with 1 child
console.log("1 child");
deleteTest.deleteItem(60);
// delete root
console.log("root");
deleteTest.deleteItem(50);
deleteTest.prettyPrint(deleteTest.root);

// find test
console.log("\nFIND TESTS");
console.log(deleteTest.find(100));
console.log(deleteTest.find(25));
console.log(deleteTest.find(30));
console.log(deleteTest.find(55));
console.log(deleteTest.find(75));
console.log(deleteTest.find(40));

// levelOrderTraversal
console.log("\nLEVEL ORDER TRAVERSAL");
const call = (node) => (node.data += 1);
deleteTest.levelOrderTraversal(call);
deleteTest.prettyPrint(deleteTest.root);
// recursive
deleteTest.levelOrderTraversalRecursive(call);
deleteTest.prettyPrint(deleteTest.root);
// preorder
console.log("\nPREORDER TRAVERSAL");
deleteTest.preorderTraversal(call);
deleteTest.prettyPrint(deleteTest.root);
// inorder
console.log("\nINORDER TRAVERSAL");
deleteTest.inorderTraversal(call);
deleteTest.prettyPrint(deleteTest.root);
// postorder
console.log("\nPOSTORDER TRAVERSAL");
deleteTest.postorderTraversal(call);
deleteTest.prettyPrint(deleteTest.root);

deleteTest.insert(75);
deleteTest.prettyPrint(deleteTest.root);

// height
console.log("\nHEIGHT TEST");
console.log(deleteTest.root);
console.log(deleteTest.find(45));
console.log("height node 45: ", deleteTest.height(deleteTest.find(45)));
console.log("height node 55: ", deleteTest.height(deleteTest.find(55)));
console.log("height node 105: ", deleteTest.height(deleteTest.find(105)));
console.log("height node 31: ", deleteTest.height(deleteTest.find(31)));
console.log("height node 60: ", deleteTest.height(deleteTest.find(60)));

// depth
console.log("\nDEPTH TEST");
console.log(deleteTest.root);
console.log(deleteTest.find(45));
console.log("depth node 45: ", deleteTest.depth(deleteTest.find(45)));
console.log("depth node 55: ", deleteTest.depth(deleteTest.find(55)));
console.log("depth node 105: ", deleteTest.depth(deleteTest.find(105)));
console.log("depth node 31: ", deleteTest.depth(deleteTest.find(31)));
console.log("depth node 60: ", deleteTest.depth(deleteTest.find(60)));
deleteTest.prettyPrint(deleteTest.root);

// isBalanced
console.log("\nISBALANCED TEST");
console.log("isBalanced", deleteTest.isBalanced());
console.log("\nISBALANCED TEST NEW ARRAY");
const balancedArray = [
  0, 10, 8, 4, 9, 5, 6, 10, 11, 15, 20, 23, 27, 30, 40, 50, 45,
];
const balanced = new Tree(balancedArray);
console.log("isBalanced", balanced.isBalanced());

console.log("\n\nREBALANCING:");
deleteTest.prettyPrint();
console.log("deleteTest: ");
deleteTest.rebalance();
deleteTest.prettyPrint();
balanced.prettyPrint();
console.log("\nbalanced: ");
balanced.rebalance();
balanced.prettyPrint();

////////////////
console.log("\n\nLAST TESTS:");
const lastArray = [];
for (let i of generateNumber(100, 20)) {
  lastArray.push(i);
}
const lastTree = new Tree(lastArray);
console.log("Balanced? ", lastTree.isBalanced());
console.log("\nTRAVERSALS: (commented out to save space)");
console.log("level-order:");
//lastTree.levelOrderTraversal(console.log);
console.log("preOrder:");
//lastTree.preorderTraversal(console.log);
console.log("inOrder:");
//lastTree.inorderTraversal(console.log);
console.log("postOrder");
//lastTree.postorderTraversal(console.log);
for (let i of generateNumber(200, 10)) {
  lastTree.insert(i);
}
lastTree.prettyPrint();
console.log("Balanced? ", lastTree.isBalanced());
lastTree.rebalance();
lastTree.prettyPrint();
console.log("Balanced? ", lastTree.isBalanced());
console.log("\nTRAVERSALS:");
console.log("level-order:");
//lastTree.levelOrderTraversal(console.log);
console.log("preOrder:");
//lastTree.preorderTraversal(console.log);
console.log("inOrder:");
//lastTree.inorderTraversal(console.log);
console.log("postOrder");
//lastTree.postorderTraversal(console.log);
