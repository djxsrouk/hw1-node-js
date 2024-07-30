const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Eroare la citirea contactelor:', error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId);
  } catch (error) {
    console.error('Eroare la obținerea contactului:', error);
  }
}

async function removeContact(contactId) {
  try {
    let contacts = await listContacts();
    contacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`Contactul cu ID-ul ${contactId} a fost șters.`);
  } catch (error) {
    console.error('Eroare la ștergerea contactului:', error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: (contacts.length + 1).toString(),
      name,
      email,
      phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('Contactul a fost adăugat:', newContact);
  } catch (error) {
    console.error('Eroare la adăugarea contactului:', error);
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};