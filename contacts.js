const fs = require('fs').promises;
const path = require('path');
const { uid } = require('uid');

const contactsPath = path.join(__dirname, 'db/contacts.json');
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId  => {
const contacts = await listContacts();
const result = contacts.find(item => item.id === contactId)
if (!result) return null;
return result;
};

const removeContact = async contactId => {
    const contacts  = await listContacts();
    const data = contacts.filter(({id}) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(data));
    return data;
};

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    contacts.push(
        {
            id:uid(), name, email,  phone,
        }
    )
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};


