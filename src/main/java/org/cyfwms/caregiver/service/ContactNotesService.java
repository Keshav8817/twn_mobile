package org.cyfwms.caregiver.service;
import org.cyfwms.caregiver.dto.ContactNotesDto;
public interface ContactNotesService {
    ContactNotesDto saveAllContactNotes(ContactNotesDto cgContactNotesDtoList);
    ContactNotesDto getAllContactNotes(Long cgContactNotesId);
    void removeContactNotes(Long cgContactNotesId);
}
