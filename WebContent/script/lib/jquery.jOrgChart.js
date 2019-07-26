/**
 * jQuery org-chart/tree plugin.
 *
 * rewrite by lijiancheng@cfishchina.com
 * 2015/10/31 23:29
 *
 * Author: Héctor Vela
 * http://twitter.com/vellonce
 *
 * Original PlugIn Author: Wes Nolte
 * http://twitter.com/wesnolte
 *
 * Based on the work of Mark Lee
 * http://www.capricasoftware.co.uk
 *
 * Copyright (c) 2011 Wesley Nolte
 * Dual licensed under the MIT and GPL licenses.
 *
 */
(function ($) {
    var nodeCount = 0;
    // Option defaults

    $.fn.jOrgChart = function (options) {
        var opts = $.extend({}, $.fn.jOrgChart.defaults, options),
            $appendTo = $(opts.chartElement),
            $context = $(opts.$context) || $appendTo.parent(),
            $container = $("<div class='" + opts.chartClass + "'/>"),
            $list = $(this);

        if ($list.is("ul")) {
            if (opts.rowColor) {
                //add color to row wise
                $list.find("li").each(function () {
                    var $this = $(this),
                        classList = $this.attr('class'),
                        restClass = classList.replace(/temp|node|child|ui-draggable|ui-droppable|(^unic\d+$)|\s+/g, ''),
                        depth = $this.parents('li').length;

                    if (restClass.length) {
                        $this.removeClass(restClass);
                    }

                    $this.addClass('level-' + depth);
                });
            }
            $list.find("li.root").each(function () {
                buildNode($(this), $container, 0, opts);
            })
        } else if ($list.is("li")) {
            buildNode($list, $container, 0, opts);
        }
        $appendTo.children('.' + opts.chartClass).remove();
        $appendTo.append($container);

        // add drag and drop if enabled
        if (opts.dragAndDrop) {
            var $nodes = $('.node', $context).not(".disabled");
            var $parentNodes = $nodes.not(".child");

            $nodes.filter(':not(.root)').draggable({
                cursor: 'move',
                distance: 40,
                helper: 'original',
                opacity: 0.8,
                revert: 'invalid',
                revertDuration: 100,
                snap: '.node.expanded',
                snapMode: 'inner',
                stack: '.node',
                zIndex: opts.draggedZIndex,
                drag: function () {
                    $(this).children('.details,.opciones,.exp-col').hide();
                }
            });

            $nodes.droppable({
                accept: '.node',
                activeClass: 'drag-active',
                hoverClass: 'drop-hover',
                drop: opts.dropHandler || function () {
                }
            });
        }
    };

    $.fn.jOrgChart.defaults = {
        chartElement: 'body',
        depth: -1,
        chartClass: "jOrgChart",
        dragAndDrop: false,
        draggedZIndex: 1000,
        expand: false,
        control: false,
        rowColor: false//不同层级不同颜色
    };

    // Method that build nodes or remove nodes
    function buildNode($node, $appendTo, level, opts) {
        var RUNNING = app.deviceTree.DEVICE_PARAMS.state.Running,
            NOOPR = app.deviceTree.DEVICE_PARAMS.action.dvcNoOpr,
            ACTION = app.deviceTree.DEVICE_PARAMS.action,
            actionTemp = '<span data-role="_role_" title="_title_" class="fa _icon_"></span>',
            getEditString = function (is, isRun, noOpr,noDelete) {
                return noOpr ?
                    '' : (is ? (isRun ?
                    actionTemp.replace(/_role_/g, ACTION.dvcStopBtn).replace(/_title_/, ACTION.dvcStopBtnText).replace(/_icon_/, 'fa-pause') :
                    actionTemp.replace(/_role_/g, ACTION.dvcStartBtn).replace(/_title_/, ACTION.dvcStartBtnText).replace(/_icon_/, 'fa-play')) :
                    "<span data-role='upd' class='fa fa-edit' title='编辑'></span>") +
                (noDelete?'':"<span data-role='remove' class='fa fa-trash' title='删除'></span>");
            };

        // Construct the node container(s)
        var $table = $("<table cellpadding='0' cellspacing='0' border='0'/>"),
            $tbody = $("<tbody/>"),
            $nodeRow = $("<tr/>").addClass("node-cells"),
            $nodeCell = $("<td/>").addClass("node-cell").attr("colspan", 2),
            $childNodes = $node.children("ul:first").children("li"),
            $nodeContent = $node.clone()
                .children("ul,li")
                .remove()
                .end()
                .html(),// Draw the node,Get the contents - any markup except li and ul allowed
            $nodeDiv,
            $expandBtn,
            nodeClassName;

        if ($childNodes.length > 1) {
            $nodeCell.attr("colspan", $childNodes.length * 2);
        }

        //Increaments the node count which is used to link the source list and the org chart
        nodeCount++;

        $node.data("tree-node", nodeCount);
        $nodeDiv = $("<div>")
            .addClass("node")
            .data("tree-node", nodeCount)
            .append($nodeContent)
            .append("<div class='opciones'></div>");

        // Expand and contract nodes
        if (opts.expand) {
            if ($childNodes.length) {
                $expandBtn = $("<span class='exp-col fa fa-minus-circle' title='缩展'></span>");
                $nodeDiv.append($expandBtn);
                $expandBtn.click(function () {
                    var $expandBtn = $(this),
                        $tr = $expandBtn.closest("tr");

                    if ($expandBtn.hasClass('fa-minus-circle')) {
                        $expandBtn.removeClass('fa-minus-circle').addClass('fa-plus-circle');
                        $tr.nextAll("tr").addClass('node-hidden');
                        $node.addClass('collapsed');
                    } else {
                        $expandBtn.removeClass('fa-plus-circle').addClass('fa-minus-circle');
                        $tr.nextAll("tr").removeClass('node-hidden');
                        $node.removeClass('collapsed');
                    }
                });
            }
        }

        $nodeCell.append($nodeDiv);
        $nodeRow.append($nodeCell);
        $tbody.append($nodeRow);

        if ($childNodes.length > 0) {
            // if it can be expanded then change the cursor
            //$nodeDiv.css('cursor','n-resize');

            // recurse until leaves found (-1) or to the level specified
            if (opts.depth == -1 || (level + 1 < opts.depth)) {
                var $downLineRow = $("<tr/>"),
                    $downLineCell = $("<td/>").attr("colspan", $childNodes.length * 2),
                    $downLine, $linesRow, $childNodesRow;

                $downLineRow.append($downLineCell);

                // draw the connecting line from the parent node to the horizontal line
                $downLine = $("<div></div>").addClass("line down");
                $downLineCell.append($downLine);
                $tbody.append($downLineRow);

                // Draw the horizontal lines
                $linesRow = $("<tr/>");
                $childNodes.each(function () {
                    var $left = $("<td>&nbsp;</td>").addClass("line left top");
                    var $right = $("<td>&nbsp;</td>").addClass("line right top");
                    $linesRow.append($left).append($right);
                });

                // horizontal line shouldn't extend beyond the first and last child branches
                $linesRow.children(":first,:last").removeClass("top");

                $tbody.append($linesRow);
                $childNodesRow = $("<tr/>");
                $childNodes.each(function () {
                    var $td = $("<td class='node-container'/>");
                    $td.attr("colspan", 2);
                    // recurse through children lists and items
                    buildNode($(this), $td, level + 1, opts);
                    $childNodesRow.append($td);
                });
            }
            $tbody.append($childNodesRow);
        }

        // any classes on the LI element get copied to the relevant node in the tree
        // apart from the special 'collapsed' class, which collapses the sub-tree at this point
        nodeClassName = $node.attr('class');
        if (nodeClassName) {
            nodeClassName = ' ' + nodeClassName + ' ';
            if (/\scollapsed\s/.test(' ' + nodeClassName + ' ')) {
                $nodeRow.nextAll('tr').addClass('node-hidden');
                $nodeRow.removeClass('expanded');
                $nodeRow.addClass('contracted');
            }
            $nodeDiv.addClass(nodeClassName.replace(/collapsed/, ''));
        }

        if (opts.control) {
            var $opciones = $nodeDiv.children('.opciones'),
                isDtl = opts.isDtl || false,
                className=$nodeDiv[0].className,
                editLevel=/\b(cud|cu|cd|ud|c|u|d)\b/,
                isRun = ~className.indexOf(RUNNING),
                noOpr = ~className.indexOf(NOOPR),
                html = '';

            //增改删 cud
            className=className.match(editLevel);
            className=className&&className[0];
            if(className) {
                switch (className) {
                    case 'cu':
                        //增改
                        html += getEditString(isDtl, isRun, noOpr, true)
                            + "<span data-role='cre' class='fa fa-plus-circle' title='添加子节点'>";
                        break;
                    case 'cd':
                        html += "</span><span data-role='remove' class='fa fa-trash' title='删除'></span>"
                            + "<span data-role='cre' class='fa fa-plus-circle' title='添加子节点'>";
                        break;
                    case 'ud':
                        //改删
                        html += getEditString(isDtl, isRun, noOpr);
                        break;
                    case 'c':
                        html+="<span data-role='cre' class='fa fa-plus-circle' title='添加子节点'>";
                        break;
                    case 'u':
                        html+="<span data-role='upd' class='fa fa-edit' title='编辑'></span>";
                        break;
                    case 'd':
                        html+="</span><span data-role='remove' class='fa fa-trash' title='删除'></span>";
                        break;
                    default:
                        //增改删
                        html += getEditString(isDtl, isRun, noOpr)
                            + "<span data-role='cre' class='fa fa-plus-circle' title='添加子节点'></span>";
                }
            }

            $opciones.append(html);
        }

        $table.append($tbody);
        $appendTo.append($table);


        //事件绑定
        $nodeDiv
            .mouseenter(function (e) {
                var $nodeDiv = $(this),
                    $detail = $nodeDiv.children(".details"),
                    $opciones = $nodeDiv.children('.opciones');

                if ($detail.length && $detail.children().length) {
                    var $parentX = $nodeDiv.closest('.' + opts.chartClass),
                        $parentY = $parentX.parent().parent(),
                        offsetX = $parentX.width() + Math.max($parentX.offset().left, 0) - $detail.outerWidth()-10,
                        offsetY = $parentY.height() + Math.max($parentY.offset().top, 0) - $detail.height();

                    if (e.pageX > offsetX) {
                        $detail.addClass('details-left').css('left', -15 - $detail.outerWidth() + 'px');
                    } else {
                        $detail.removeClass('details-left').css('left', '');
                    }

                    if (e.pageY > offsetY) {
//                        $detail.css('top', 0 - $detail.height() / 2 + 'px');
                    } else {
                        $detail.css('top', '');
                    }

                    $nodeDiv.css("z-index", "999");
                    $detail.fadeIn(100);
                }
                $opciones.fadeIn(150);
            })
            .mouseleave(function () {
                var $nodeDiv = $(this);
                $nodeDiv.children(".details").fadeOut(100);
                $nodeDiv.children('.opciones').fadeOut(150);
                $nodeDiv.css('z-index', '');
            });
        /* Prevent trees collapsing if a link inside a node is clicked */
        $nodeDiv.children('a, span').click(function (e) {
            e.stopPropagation();
        });
    }
})(jQuery);
