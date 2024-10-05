const persons = JSON.parse(localStorage.getItem('persons')) || [];

function createPersonFile() {
    const fileName = document.getElementById('fileName').value;
    const coverImage = document.getElementById('coverImage').files[0];
    const password = document.getElementById('filePassword').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const additionalInfo = document.getElementById('additionalInfo').value;

    if (fileName && coverImage && password && age && gender) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const person = {
                fileName: fileName,
                coverImage: e.target.result,
                password: password,
                age: age,
                gender: gender,
                additionalInfo: additionalInfo,
            };
            persons.push(person);
            localStorage.setItem('persons', JSON.stringify(persons)); // حفظ البيانات في localStorage
            displayPersons();
            clearFields();
        };
        reader.readAsDataURL(coverImage);
    } else {
        alert("يرجى ملء جميع الحقول.");
    }
}

function displayPersons() {
    const personList = document.getElementById('person-list');
    personList.innerHTML = '';
    persons.forEach((person, index) => {
        const personCard = document.createElement('div');
        personCard.className = 'person-card';
        personCard.innerHTML = `
            <img src="${person.coverImage}" width="120" style="border-radius: 50%;"><br> <!-- زيادة حجم الصورة -->
            <strong>${person.fileName}</strong><br>
            <div class="actions">
                <button class="button action-button" onclick="showPersonDetails(${index})">عرض</button>
                <button class="button action-button" onclick="editPerson(${index})">تعديل</button>
                <button class="button action-button" onclick="deletePerson(${index})">حذف</button>
            </div>
        `;
        personList.appendChild(personCard);
    });
}

function showPersonDetails(index) {
    const person = persons[index];
    const password = prompt('ادخل كلمة المرور:');
    if (password === person.password) {
        const detailsHtml = `
            <div style="text-align:center;">
                <h2>${person.fileName}</h2>
                <img src="${person.coverImage}" width="300" style="border-radius: 8px;">
                <p><strong>العمر:</strong> ${person.age}</p>
                <p><strong>الجنس:</strong> ${person.gender}</p>
                <p><strong>معلومات إضافية:</strong> ${person.additionalInfo}</p>
                <button class="button" onclick="goBack()">رجوع</button>
            </div>
        `;
        document.body.innerHTML = detailsHtml;
    } else {
        alert('كلمة المرور غير صحيحة!');
    }
}

function editPerson(index) {
    const person = persons[index];
    const password = prompt('ادخل كلمة المرور لتعديل الملف:');
    if (password === person.password) {
        document.getElementById('fileName').value = person.fileName;
        document.getElementById('coverImage').value = ''; // إعادة تعيين الملف
        document.getElementById('filePassword').value = person.password;
        document.getElementById('age').value = person.age;
        document.getElementById('gender').value = person.gender;
        document.getElementById('additionalInfo').value = person.additionalInfo;
        deletePerson(index); // حذف الشخص الحالي حتى يتم تعديله
    } else {
        alert('كلمة المرور غير صحيحة!');
    }
}

function deletePerson(index) {
    const password = prompt('ادخل كلمة المرور لحذف الملف:');
    if (password === persons[index].password) {
        persons.splice(index, 1);
        localStorage.setItem('persons', JSON.stringify(persons)); // حفظ البيانات بعد الحذف
        displayPersons();
    } else {
        alert('كلمة المرور غير صحيحة!');
    }
}

function goBack() {
    displayPersons(); // عرض الأشخاص مرة أخرى دون إعادة تحميل الصفحة
}

function clearFields() {
    document.getElementById('fileName').value = '';
    document.getElementById('coverImage').value = '';
    document.getElementById('filePassword').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('additionalInfo').value = '';
}

// البحث عن الملفات
document.getElementById('search').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const personList = document.getElementById('person-list');
    personList.innerHTML = '';

    persons.forEach((person, index) => {
        if (person.fileName.toLowerCase().includes(query)) {
            const personCard = document.createElement('div');
            personCard.className = 'person-card';
            personCard.innerHTML = `
                <img src="${person.coverImage}" width="120" style="border-radius: 50%;"><br> <!-- زيادة حجم الصورة -->
                <strong>${person.fileName}</strong><br>
                <div class="actions">
                    <button class="button action-button" onclick="showPersonDetails(${index})">عرض</button>
                    <button class="button action-button" onclick="editPerson(${index})">تعديل</button>
                    <button class="button action-button" onclick="deletePerson(${index})">حذف</button>
                </div>
            `;
            personList.appendChild(personCard);
        }
    });
});

// عرض الأشخاص عند تحميل الصفحة
displayPersons();




