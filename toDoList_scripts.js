let toDoInput //formularz pobierający zadania
let errorInfo // pole na errory
let addBtn // przycisk dodający zadanie
let ulList // lista z zadaniami
let liElement // zadanie
let tools // przyciski obok zadania
let completeBtn, editBtn, deleteBtn //zawartość tool
let completeI, deleteI //zawartośc przycisków complete i delete
let counter = 0 // numer elementu w atrybucie data-id
let acceptBtn, cancelBtn // przyciski w popupie do edytowania zadań
let editPopup // cały popup do edycji zadań
let editInput // formularz do edycji zadań
let editTarget // zmienna przechowująca przycisk 'edit' po kliknięciu go

const prepareDOMElements = () => {
	toDoInput = document.querySelector(".todo-input")
	errorInfo = document.querySelector(".error-info")
	addBtn = document.querySelector(".btn-add")
	ulList = document.querySelector(".todolist ul")
	editInput = document.querySelector(".popup-input")
	editPopup = document.querySelector(".popup")
	acceptBtn = document.querySelector(".accept")
	cancelBtn = document.querySelector(".cancel")
}
const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addElement)
	toDoInput.addEventListener("keyup", (e) => {
		if (e.key == "Enter") {
			addElement()
		}
	})
	ulList.addEventListener("click", checkClick)
	editPopup.addEventListener("click", (e) => editElement(e, editTarget))
	editInput.addEventListener("keyup", (e) => editElement(e, editTarget))
	document.addEventListener("keyup", (e) => {
		if (e.key == "Escape") {
			editPopup.style.display = "none"
		}
	})
}
const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
	createTools()
}
const createTools = () => {
	tools = document.createElement("div")
	tools.classList.add("tools")

	completeBtn = document.createElement("button")
	completeBtn.classList.add("complete")

	completeI = document.createElement("i")
	completeI.classList.add("fas", "fa-check")

	completeBtn.append(completeI)

	editBtn = document.createElement("button")
	editBtn.classList.add("edit")
	editBtn.textContent = "EDIT"

	deleteBtn = document.createElement("button")
	deleteBtn.classList.add("delete")

	deleteI = document.createElement("i")
	deleteI.classList.add("fas", "fa-times")

	deleteBtn.append(deleteI)

	tools.append(completeBtn, editBtn, deleteBtn)
}
const addElement = () => {
	if (toDoInput.value !== "") {
		liElement = document.createElement("li")
		liElement.setAttribute("data-id", `element${counter++}`)
		liElement.textContent = toDoInput.value
		liElement.append(tools.cloneNode(true))
		ulList.append(liElement)
		toDoInput.value = ""
	} else {
		errorInfo.textContent = "Wpisz treść zadania!"
	}
	const allToDos = document.querySelectorAll("li")
	if (allToDos.length > 0) {
		errorInfo.textContent = ""
	}
}
const editElement = (e, editTarget) => {
	if (e.target.matches(".accept") || e.key == "Enter") {
		if (editInput.value === "") {
			delElement(editTarget)
			editPopup.style.display = "none"
		} else {
			editTarget.target.closest("li").firstChild.textContent =
				editInput.value
			editPopup.style.display = "none"
		}
	} else if (e.target.matches(".cancel")) {
		editPopup.style.display = "none"
	}
}
const delElement = (e) => {
	e.target.closest("li").remove()
	if (e.target.closest("li") === editTarget.target.closest("li")) {
		editPopup.style.display = "none"
	}
	const allToDos = document.querySelectorAll("li")
	if (allToDos.length == 0) {
		errorInfo.textContent = "Brak zadań na liście"
	}
}
const checkClick = (e) => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed")
		e.target.classList.toggle("completed")
	} else if (e.target.matches(".edit")) {
		editPopup.style.display = "flex"
		editTarget = e
		editInput.value = editTarget.target.closest("li").firstChild.textContent
	} else if (e.target.matches(".delete")) {
		delElement(e)
	}
}
document.addEventListener("DOMContentLoaded", main)
