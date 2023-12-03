/**
 *
 * @param {HTMLElement} node
 * @param {string} data
 */
export function draggable(node, data) {
	let state = data;

	node.draggable = true;
	node.style.cursor = 'grab';

	/**
	 *
	 * @param {DragEvent} e
	 */
	function handleDragStart(e) {
		e.dataTransfer?.setData('text/plain', state);
		node.style.cursor = 'grabbing';
	}

	node.addEventListener('dragstart', handleDragStart);

	return {
		/**
		 *
		 * @param {string} data
		 */
		update(data) {
			state = data;
		},
		destroy() {
			node.removeEventListener('dragstart', handleDragStart);
		}
	};
}

/**
 *
 * @param {HTMLElement} node
 * @param {Record<string, any>} options
 */
export function dropzone(node, options) {
	let state = {
		dropEffect: 'move',
		dragover_class: 'droppable',
		...options
	};

	/**
	 *
	 * @param {DragEvent} e
	 */
	function handleDragEnter(e) {
		//@ts-ignore
		e.target?.classList.add(state.dragover_class);
	}
	/**
	 *
	 * @param {DragEvent} e
	 */
	function handleDragLeave(e) {
		//@ts-ignore
		e.target?.classList.remove(state.dragover_class);
	}
	/**
	 *
	 * @param {DragEvent} e
	 */
	function handleDragOver(e) {
		e.preventDefault();
		//@ts-ignore
		e.dataTransfer.dropEffect = state.dropEffect;
	}

		/**
	 *
	 * @param {DragEvent} e
	 */
	function handleDrop(e) {
		e.preventDefault();
		const data = e.dataTransfer?.getData('text/plain');
		//@ts-ignore
		e.target.classList.remove(state.dragover_class);
				//@ts-ignore
		state.on_dropzone(data, e)
	}


	node.addEventListener('dragenter', handleDragEnter);
	node.addEventListener('dragleave', handleDragLeave);
	node.addEventListener('dragover', handleDragOver);
	node.addEventListener('drop', handleDrop);
}
