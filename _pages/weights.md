---
order: 5
message_1: See how many 
link: weight
message_2: plates you need.
---

<html>

<head>
	<style>
		#result *{
			border-collapse: collapse;
			border: 1px solid black;
		}

		#result td{
			width: 150px;
		}

		hr{
			page-break-after: always;
		}

		table{
			border-collapse: collapse;
		}
	</style>
	<script>

		var weights = [];

		function addWeight() {
			var kg = parseInt(document.getElementById("kg").value);
			var amount = parseInt(document.getElementById("amount").value);

			console.log(kg);
			weights.push({ kg: kg, c: amount });

			document.getElementById("list").innerHTML += "<li>" + kg + " x" + amount + "</li>";
		}


		function defaults() {
			weights = JSON.parse(document.getElementById("defaults").value);
			console.log(weights);

			document.getElementById("list").innerHTML = "";
			weights.forEach(row=>{
				document.getElementById("list").innerHTML += "<li>" + row.kg + " x" + row.c + "</li>";
			})
		}

		function calculate() {

			var bar =  parseInt(document.getElementById("bar").value);
			var taken = {};
			var stacks = [];

			var stackOfStacks = {};
			var index = 0;
			weights.forEach(w => {
				var curr = 0;
				var stack = [];
				for (var i = 0; i < w.c; i++) {
					stack.push({ kg: w.kg, text: w.kg + " " });
				}
				stacks.push(stack);
			});

			function removeFromStack(stack1, num) {
				var stack = JSON.parse(JSON.stringify(stack1));

				if (stack[num].length == 0)
					return [];

				stack[num].pop();
				if (stack[num].length == 0)
					stack.splice(num, 1);
				return stack;
			}

			function total(stack) {
				var t = 0;
				stack.forEach(s => {
					s.forEach(count => {
						t += count.kg;
					});
				});
				return t;
			}

			function text(stack) {
				var t = "";
				var disks = 0;
				stack.forEach(s => {
					s.forEach(count => {
						t += count.text;
						disks += 1;
					});
				});
				return { t: t, disks: disks };
			}

			function makeMoreStacks(stack) {
				if (stack.length == 0) return;

				var totalStack = total(stack);
				var kg = totalStack * 2 + bar;
				info = text(stack);

				if (taken[totalStack] != 1 || stackOfStacks[kg].d > info.disks) {
					stackOfStacks[kg] = ({ k: kg, p: Math.round(2.20462 * kg), st: totalStack, s: info.t, d: info.disks });
					taken[totalStack] = 1;

					for (var i = 0; i < stack.length; i++) {
						makeMoreStacks(removeFromStack(stack, i));
					}
				}
			}

			makeMoreStacks(stacks);

			document.getElementById("result").innerHTML = 
				"<tr>" + 
					"<th>Total KG</th>"+ 
					"<th>Total LB</th>"+ 
					"<th>KG (oneside)</th>"+ 
					"<th>Stack</th>"+ 
					"<th>Disks</th>"+ 
					"</tr>";

			Object.keys(stackOfStacks).forEach(i => {
				const row = stackOfStacks[i];

				//k: kg, p: Math.round(2.20462 * kg), st: totalStack, s: info.t, d: info.disks })
				document.getElementById("result").innerHTML += "<tr>" + 
					"<td>"+row.k+" kg</td>" + 
					"<td>"+row.p+" pound</td>" + 
					"<td>"+row.st+" kg</td>" + 
					"<td>"+row.s+"</td>" + 
					"<td>"+row.d+" disks</td>" + 
					"</tr>";

			});
		}
	</script>
</head>


<body>
	<h1>What do you have? (one side only)</h1>

	<ul id="list">

	</ul>

	<label>Bar Weight:</label><input type="number" id="bar" value="8" min="0"><br />
	<label>KG:</label><input type="number" id="kg" value="45" min="0"><br />
	<label>Amount:</label><input type="number" id="amount" value="1" min="0">
	<button onclick="addWeight()">Add</button>
	<br />
	<button onclick="defaults()">My Defaults</button>
	<textarea id="defaults" width="200px" height="200px">[
		{"kg": 20, "c": 1},
		{"kg": 11, "c": 1},
		{"kg": 5, "c": 2},
		{"kg": 2, "c": 4},
		{"kg": 0.5, "c": 2}
]</textarea>
	<br />
	<button onclick="calculate()">Calculate</button>
	<h1>Breakdown</h1>
	<hr />

	<table id="result"></table>

</body>

</html>
