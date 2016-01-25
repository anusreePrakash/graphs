var _ = require('lodash');

var graph ={
	UndirectedGraph: function(){
		this.uniGraph = {};
	},
	DirectedGraph: function(){
		this.diGraph = {};
	}
}

graph.UndirectedGraph.prototype ={
	addVertex : function(vertex){
		this.uniGraph[vertex] = [];
	},
	addEdge : function(from,to){
	this.uniGraph[from].push(to);
	this.uniGraph[to].push(from);

	},
	hasEdgeBetween : function(from,to){
		return(_.indexOf(this.uniGraph[from],to)!=-1);
	},
	order : function(vertex){
		return Object.keys(this.uniGraph).length;
	},
	size : function(){
		var count = 0;
		_.forIn(this.uniGraph, function(value, key) {
			value.length != 0 ? count++ : count;
		});
			return Math.ceil(count/2);
	},
	pathBetween : function(from,to,visited){
		var visited = visited || [];
		if(from == to){
			return visited.concat(from);
		}
		for(var index in this.uniGraph[from]){
			var vertex = this.uniGraph[from][index];
			if(visited.indexOf(vertex)==-1){
				var path  = this.pathBetween(vertex,to,visited.concat(from));
				if(path[path.length-1]==to)
					return path;
			}
		}
		return [];
	},
	farthestVertex : function(from){
		var count = 0;
		var farthest;
		for(var index in Object.keys(this.uniGraph)){
			var vertex = Object.keys(this.uniGraph)[index];
			var path = this.pathBetween(from, vertex);
			if (count < path.length){
				count = path.length;
				farthest = path[path.length - 1];
			}
		}
		return	 farthest;
	}
};


//==============================================================================

graph.DirectedGraph.prototype ={
	addVertex : function(vertex){
		this.diGraph[vertex] = [];
	},
	addEdge : function(from,to){
		this.diGraph[from].push(to);
	},
	hasEdgeBetween : function(from,to){
		return(_.indexOf(this.diGraph[from],to)!=-1);
	},
	order : function(vertex){
		return Object.keys(this.diGraph).length;
	},
	size : function(){
		var count = 0;
		_.forIn(this.diGraph, function(value, key) {
			value.length != 0 ? count++ : count;
		});
			return count;
	},
	pathBetween : function(from,to,visited){
		var visited = visited || [];
		if(from == to){
			return visited.concat(from);
		}
		for(var index in this.diGraph[from]){
			var vertex = this.diGraph[from][index];
			if(visited.indexOf(vertex) == -1){
				var path = this.pathBetween(vertex,to,visited.concat(from));
				if(path[path.length-1]==to)
					return path;
			}
		}
		return [];
	},
	farthestVertex : function(from){
		var count = 0;
		var farthest;
		for(var index in Object.keys(this.diGraph)){
			var vertex = Object.keys(this.diGraph)[index];
			var path = this.pathBetween(from, vertex);
			if (count < path.length){
				count = path.length;
				farthest = path[path.length - 1];
			}
		}
		return	 farthest;
	}
};


module.exports = graph;
