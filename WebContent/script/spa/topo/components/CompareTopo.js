/**
 * 拓扑图对比
 */
define([], function () {
	let CompareTopo = function (opts) {
		this.diffNode = [];
		this.diffLinks = [];
		this.diffText = [];
		this.diffLineBlock = [];
	}
	CompareTopo.prototype = {
		compare (topo1, topo2) {
			var nodediff = this.compareNode(topo1.nodes, topo2.nodes);
			var nodelinks = this.compareLinks(topo1.links, topo2.nodes);
			var nodetext = this.compareText(topo1.dragType.text, topo2.dragType.text);
			var nodelineblock = this.compareLinkBlock(topo1.dragType.lineBlock, topo2.dragType.lineBlock);
			return {nodediff, nodelinks, nodetext, nodelineblock};
		},
		compareNode (nodes1, nodes2) {
			return {
				add: this.findNew(node1, node2, 'id'),
				change: this.findChange(node1, node2, 'id'),
				del: this.findDel(node1, node2, 'id')
			}
		},
		compareLinks (links1, links2) {
			
		},
		compareText (text1, text2) {
			
		},
		compareLinkBlock (lineBlock1, lineBlock2) {
			
		},
		findNew (arr1, arr2, primaryKey) {
			return arr2.filter(item => {
				if (item[primaryKey]) {
					
				}
			})
		},
		findChange (arr1, arr2) {
			
		},
		findDel (arr1, arr2) {
			
		}
	}
	return CompareTopo;
})