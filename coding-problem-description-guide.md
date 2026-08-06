## Coding Problem Description Guidelines

1. **Use a clear and descriptive title.**

   * The title should summarize the problem.
   * Example: `Find the Second Largest Element in an Array`

2. **Start with a concise problem statement.**

   * Explain **what needs to be solved**, not the solution approach.
   * Example: *"Given an array of integers, return the second largest distinct element. If it does not exist, return `-1`."*

3. **Define the expected function or method signature.**

   * Specify the function name, parameters, and return type.
   * Example: `secondLargest(nums: List[int]) -> int`

4. **Describe every input parameter clearly.**

   * Explain the type, purpose, and possible values of each parameter.
   * Example: *"`nums` is an array of integers that may contain duplicate values."*

5. **Specify the expected output.**

   * Clearly state what the function should return or print.
   * Example: *"Return the second largest distinct integer, or `-1` if no such value exists."*

6. **Define complex data structure representations.**

   * If the input contains trees, graphs, linked lists, or custom objects, explain their structure.
   * Example (Tree): *"`root` represents the root node of a binary tree using the `TreeNode` structure."*
   * Example (Graph): *"`graph[i]` contains the list of nodes directly connected to node `i`."*

7. **Provide data structure definitions when required.**

   * Include class or node definitions for custom structures.
   * Example (Binary Tree):

     ```java
     class TreeNode {
         int val;
         TreeNode left;
         TreeNode right;
     }
     ```
   * Example (Graph Node):

     ```java
     class Node {
         int val;
         List<Node> neighbors;
     }
     ```

8. **Specify complex data structure properties.**

   * Define characteristics that affect the solution.
   * Example (Tree): *"The tree is binary, where each node has at most two children."*
   * Example (Graph): *"The graph is undirected and may contain cycles."*

9. **Clarify graph-specific details.**

   * Mention:

     * Whether the graph is directed or undirected.
     * Whether it is connected or disconnected.
     * Whether cycles exist.
     * Whether duplicate edges or self-loops are allowed.
   * Example: *"The graph contains `n` nodes labeled from `0` to `n-1`. It may contain multiple components and has no duplicate edges."*

10. **Specify tree-specific details.**

* Mention:

  * Whether the tree can be empty.
  * Whether it is binary, BST, N-ary, etc.
  * Any ordering properties.
* Example: *"`root` may be `null`. The input tree is a valid binary search tree."*

11. **Include input constraints.**

* Constraints help determine the expected complexity.
* Example:

  * Array: `1 ≤ nums.length ≤ 100000`
  * Tree: `0 ≤ Number of nodes ≤ 100000`
  * Graph: `1 ≤ n ≤ 200000`

12. **Define special cases explicitly.**

* Mention behavior for unusual inputs.
* Example:

  * *"If the tree is empty, return `0`."*
  * *"If the graph has no edges, return `false`."*

13. **Clarify ambiguous terms.**

* Define words that may have multiple meanings.
* Example:

  * *"'Distinct' means duplicate values are counted only once."*
  * *"'Connected graph' means every node can be reached from every other node."*

14. **Specify indexing conventions.**

* Mention whether indexing is 0-based or 1-based.
* Example: *"Nodes are labeled from `0` to `n-1`."*

15. **Provide examples with input, output, and explanation.**

* Include enough details to understand the expected behavior.
* Example:

  ```text
  Input:
  [5, 2, 4, 1]

  Output:
  4

  Explanation:
  5 is the largest value and 4 is the second largest distinct value.
  ```

16. **Include edge-case examples.**

* Cover scenarios such as:

  * Empty input
  * Single element
  * Duplicate values
  * Negative values
  * Empty tree
  * Disconnected graph
* Example:

  ```text
  Input:
  [3, 3, 3]

  Output:
  -1

  Explanation:
  No second distinct largest element exists.
  ```

17. **Avoid revealing the solution approach.**

* Describe the requirement, not the algorithm.
* ✅ Example: *"Return the shortest path length between two nodes."*
* ❌ Example: *"Use Dijkstra's algorithm to find the shortest path."*

18. **Mention performance expectations when necessary.**

* Only include when the expected complexity is important.
* Example: *"The solution should handle up to `10^5` nodes efficiently."*

19. **Keep the language simple and precise.**

* Avoid unclear statements.
* ✅ Example: *"Return the number of connected components in the graph."*
* ❌ Example: *"Find how many groups exist."*

20. **Use a consistent structure for every problem.**

* Recommended order:

  1. Title
  2. Problem Statement
  3. Function Signature
  4. Input Parameters
  5. Data Structure Definition (if applicable)
  6. Output
  7. Constraints
  8. Examples
  9. Edge Cases / Notes

21. **Ensure the problem is self-contained.**

* A candidate should not need additional assumptions.
* Example:

  * ❌ *"Given a graph, find the answer."*
  * ✅ *"Given an undirected graph with `n` nodes and `m` edges, return the number of connected components."*

22. **Use consistent terminology throughout the problem.**

* Do not switch between terms.
* Example:

  * Use "node" consistently for trees/graphs instead of mixing "vertex", "element", and "item" without explanation.

23. **Verify examples against the rules and constraints.**

* Ensure:

  * Input format is valid.
  * Output matches the expected result.
  * Examples cover important scenarios.
  * Constraints allow the provided examples.
