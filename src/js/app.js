const API = '';

const state = {
	tasks:[],query:''
};

const columns = [
	['todo','Por hacer'],
	['in-progress','En progreso'],
	['done','Finalizado']
];

const labels = {
	high:'Alta',
	medium:'Media',
	low:'Baja'
};

const $ = s => document.querySelector(s);

const escapeHTML = value => String(value ?? '').replace(
	/[&<>'"]/g,
		c => ({
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			"'": '&#39;',
			'"': '&quot;'
		}[c])
);

const dateText = date => 
	date
		? new Date(date + 'T12:00:00').toLocaleDateString(
			'es-ES', {
				day: '2-digit',
				month:'short'
			}
		)
	:'Sin fecha';

// Task's list from `json-server` via `fetch`
async function request(path,options = {}) {
	const response = await fetch(API + path, {
		headers: { 'Content-Type': 'application/json' },
		...options
	});

	if (!response.ok)
		throw new Error('Error de API');

	return response.status === 204
		? null
		: response.json();
}

// GET Petition
async function load() {
	state.tasks = await request('/tasks');
	render();
}

function render() {
	const filtered = state.tasks.filter(
		t => t.title
			.toLowerCase()
			.includes(state.query.toLowerCase())
	);
	
	$('#stats').textContent =
	state.tasks.length === 0
	? 'Ninguna tarea disponible'
	: `${state.tasks.length} ${state.tasks.length === 1 ? 'tarea' : 'tareas'}`;
	
	// Dynamic rendering of each card inside its corresponding table evaluating `status`
	$('#board-columns').innerHTML = columns
		.map(([status,title]) => {
			const tasks = filtered.filter(t => t.status === status);

			return `<section class="column" data-status="${status}"><div class="column-header"><div class="column-title"><i class="column-dot"></i>${title}</div><span class="count">${tasks.length}</span></div><div class="task-list" data-status="${status}">${tasks.length ? tasks.map(card).join('') : '<div class="empty">No hay tareas aquí</div>'}</div></section>`
		})
		.join('');

	// SortableJS instance for each `.task-list`
	document.querySelectorAll('.task-list').forEach(
		el => new Sortable(el, {
			group: 'kanban',
			animation: 180,
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			draggable: '.task-card',
			handle: '.drag-handle',
			// On mouse release PATCH Petition
			onEnd: async event => {
				const id = event.item.dataset.id;
				const status = event.to.dataset.status;
				// Immediate `status` update
				const task = state.tasks.find(t => String(t.id) === id);

				if (task && task.status !== status) {
					task.status = status;
					await request('/tasks/' + id, {
						method:'PATCH',
						body:JSON.stringify({ status })
					});
					render();
				}
			}
		})
	);
}

// HTML generated for each individual task
function card(t) {
	const commentCount = t.comments?.length || 0;

	return `<article class="task-card" data-id="${escapeHTML(t.id)}" tabindex="0" aria-label="${escapeHTML(t.title)}"><div class="card-actions"><button class="edit-button" type="button" aria-label="Editar tarea">✎</button><button class="comments-button${commentCount === 0 ? ' no-comments' : ''}" type="button" aria-label="Comentarios">${commentCount > 0 ? `🗨 ${commentCount}` : '🗨'}</button><span class="drag-handle" aria-label="Arrastrar tarea">⠿</span></div><h3>${escapeHTML(t.title)}</h3><p>${escapeHTML(t.description)}</p><div class="card-meta"><span class="priority priority-${t.priority}">${labels[t.priority]}</span><span>${dateText(t.dueDate)}</span></div></article>`;
}

function openModal(content) {
	$('#modal-content').innerHTML = content;
	$('#modal-backdrop').hidden = false;
}

function closeModal() {
	$('#modal-backdrop').hidden = true;
}

// Interactive form for creating a new card: `taskForm()`
function taskForm(task = null) {
	const editing = !!task;

	openModal(`<h2 id="modal-title">${editing ? 'Editar tarea' : 'Nueva tarea'}</h2><form id="task-form" class="form-grid"><div class="field"><label for="task-title">Título</label><input id="task-title" required value="${escapeHTML(task?.title)}"></div><div class="field"><label for="task-description">Descripción</label><textarea id="task-description" required>${escapeHTML(task?.description)}</textarea></div><div class="form-grid" style="grid-template-columns:1fr 1fr"><div class="field"><label for="task-priority">Prioridad</label><select id="task-priority"><option value="low" ${task?.priority === 'low' ? 'selected' : ''}>Baja</option><option value="medium" ${task?.priority === 'medium' ? 'selected' : ''}>Media</option><option value="high" ${task?.priority === 'high' ? 'selected' : ''}>Alta</option></select></div><div class="field"><label for="task-date">Fecha límite</label><input id="task-date" type="date" value="${escapeHTML(task?.dueDate)}"></div></div><div class="form-actions"><button type="button" class="button" id="cancel-button">Cancelar</button><button class="button button-primary">${editing ? 'Guardar cambios' : 'Crear tarea'}</button></div></form>`);

	$('#cancel-button').onclick = closeModal;

	// Card creation via POST
	$('#task-form').onsubmit = async e => {
		e.preventDefault();

		// `status:task?.status || 'todo'` defaults new cards into the "Por hacer" column
		const data = {
			title: $('#task-title').value.trim(),
			description:$('#task-description').value.trim(),
			priority:$('#task-priority').value,
			dueDate:$('#task-date').value,
			status:task?.status || 'todo',
			comments:task?.comments || []
		};

		// Task Editing via PUT Petition
		if (editing) {
			await request('/tasks/' + task.id, {
				method:'PUT',
				body:JSON.stringify({ ...task, ...data})
			});
		} else
			await request('/tasks', {
				method:'POST',
				body:JSON.stringify(data)
		});

		closeModal();
		await load();
	};
}

// Task Editing
function detail(task) {
	openModal(`<h2 id="modal-title">Detalle de la tarea</h2><form id="task-form" class="form-grid"><div class="field"><label for="task-title">Título</label><input id="task-title" required value="${escapeHTML(task.title)}"></div><div class="field"><label for="task-description">Descripción</label><textarea id="task-description" required>${escapeHTML(task.description)}</textarea></div><div class="form-grid" style="grid-template-columns:1fr 1fr"><div class="field"><label for="task-priority">Prioridad</label><select id="task-priority"><option value="low" ${task.priority === 'low' ? 'selected' : ''}>Baja</option><option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Media</option><option value="high" ${task.priority === 'high'?'selected' : ''}>Alta</option></select></div><div class="field"><label for="task-status">Estado</label><select id="task-status"><option value="todo" ${task.status === 'todo' ? 'selected' : ''}>Por hacer</option><option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>En progreso</option><option value="done" ${task.status === 'done' ? 'selected' : ''}>Finalizado</option></select></div></div><div class="form-actions"><button type="button" class="button button-danger" id="delete-button">Eliminar</button><button class="button button-primary">Guardar cambios</button></div></form>`);

	$('#task-form').onsubmit = async e => {
		e.preventDefault();

		// PATCH Petition for Task Editing
		await request('/tasks/' + task.id, {
			method:'PATCH',
			body:JSON.stringify({
				title: $('#task-title').value.trim(),
				description: $('#task-description').value.trim(),
				priority: $('#task-priority').value,
				status: $('#task-status').value
			})
		});

		closeModal();
		await load()
	};

	// Card Deletion via DELETE Petition
	$('#delete-button').onclick = async () => {
		if (confirm('¿Eliminar esta tarea?')) {
			await request('/tasks/' + task.id, {
				method:'DELETE'
			});

			closeModal();
			await load()
		}
	};
}

// Comment Creation
function commentsModal(task) {
	openModal(`<h2 id="modal-title">Comentarios</h2><div class="comments">${(task.comments || []).map(c => `<div class="comment"><strong>${escapeHTML(c.author)}</strong><time> · ${dateText(c.createdAt.slice(0,10))}</time><p>${escapeHTML(c.text)}</p></div>`).join('') || '<p class="subtitle">Aún no hay comentarios.</p>'}<form class="comment-form" id="comment-form"><input id="comment-author" required placeholder="Tu nombre" aria-label="Tu nombre"><textarea id="comment-text" required placeholder="Añadir un comentario..." aria-label="Nuevo comentario"></textarea><button class="button button-primary">Comentar</button></form></div>`);

	$('#comment-form').onsubmit = async e => {
		e.preventDefault();

		const comments = [
			...(task.comments || []),
			{
				id: crypto.randomUUID(),
				author: $('#comment-author').value.trim(),
				text: $('#comment-text').value.trim(),
				createdAt: new Date().toISOString()
			}
		];

		await request('/tasks/' + task.id, {
			method:'PATCH',
			body:JSON.stringify({ comments })
		});

		const updated = { ...task, comments };

		state.tasks = state.tasks.map(
			t => t.id === task.id ? updated : t
		);

		render();
		commentsModal(updated);
	};
}

// `taskForm()` Call Action
$('#new-task-button').onclick = () => taskForm();

$('#search-input').oninput = e => {
	state.query = e.target.value;
	render()
};

$('#modal-close').onclick = closeModal;

$('#modal-backdrop').onclick = e => {
	if (e.target.id === 'modal-backdrop')
		closeModal()
};

// Menu Interaction for Responsive Design
$('#menu-button').onclick = () => {
	const menu = $('#mobile-menu');
	menu.hidden = !menu.hidden;
	$('#menu-button').setAttribute(
		'aria-expanded',
		String(!menu.hidden)
	);
};

// Open Modal Details Window
document.addEventListener('click', e => {
	const editButton = e.target.closest('.edit-button');
	const commentsButton = e.target.closest('.comments-button');

	if (!editButton && !commentsButton)
		return;

	const button = editButton || commentsButton;
	const cardEl = button.closest('.task-card');

	if (!cardEl)
		return;

	const task = state.tasks.find(
		t => String(t.id) === cardEl.dataset.id
	);

	if (!task)
		return;

	if (editButton)
		detail(task);

	if (commentsButton)
		commentsModal(task);
});

document.addEventListener('keydown', e => {
	if (e.key === 'Escape')
		closeModal();
});

load().catch(() => {
	$('#board-columns').innerHTML = '<div class="loading">No se pudo conectar con json-server. Ejecuta <code>npm run dev</code>.</div>'
});