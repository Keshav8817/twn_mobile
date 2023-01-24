package org.cyfwms.caregiver.api;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.caregiver.dto.*;
import org.cyfwms.caregiver.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/v1/caregiverservice")
@CrossOrigin("*")
@Slf4j
public class CareGiverController {
    @Autowired
    private CareProviderService careProviderService;

    @Autowired
    private CapacityService capacityService;

    @Autowired
    private CareProviderSearchService careProviderSearchService;

    @Autowired
    private ContactNotesService contactNotesService;

    @Autowired
    private CareGiverContactNotesSearchService careGiverContactNotesSearchService;

    @Autowired
    private CareGiversBackGroundCheckService cgBackGroundCheckService;
    @Autowired
    private CGAppointmentService cgAppointmentService;
    @Autowired
    private CareGiverSearchAppointmentService careGiverSearchAppointmentService;

    @Autowired
    private CareGiverReminderService careGiverReminderService;
    @Autowired
    private CareGiverSearchReminderService careGiverSearchReminderService;


    @ApiOperation("Read a Care Provider.")
    @GetMapping(value = "/care_provider/read/{id}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public CareProviderDto readCareProvider(@PathVariable("id") Long id) {
        log.info("ReadCareProvider " + "id :" + id);
        return careProviderService.read(id);
    }

    @ApiOperation("Save/Update a Care Provider.")
    @PutMapping(value = "/care_provider/save", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public CareProviderDto saveCareProvider(@RequestBody CareProviderDto cpDto) {
        log.info("SaveCareProvider :" + cpDto);
        return careProviderService.save(cpDto);
    }

    @ApiOperation("Soft delete a Care Provider.")
    @DeleteMapping("/care_provider/remove/{referenceId}")
    @ResponseStatus(HttpStatus.OK)
    public void removeCareProvider(@PathVariable("referenceId") Long referenceId) {
        log.info("RemoveCareProvider " + "ReferenceId :" + referenceId);
        careProviderService.remove(referenceId);
    }

    @GetMapping(value = {
            "/careGiverProviderSearch/{referenceId}/{name}/{type}/{priCaregiver}/{secCaregiver}/{status}"}, produces = "application/json")
    @ApiOperation("Search Caregivers")
    @ResponseStatus(HttpStatus.OK)
    public List<CareProviderSearchResultsDto> searchCareGiver(@PathVariable Map<String, String> var) {
        CareProviderSearchCriteriaDto careProviderSearchCriteriaDto = new CareProviderSearchCriteriaDto();
        careProviderSearchCriteriaDto.setReferenceId(("null".equals(var.get("referenceId"))
                || var.get("referenceId") == null) ? null : Long.parseLong(var.get("referenceId")));
        careProviderSearchCriteriaDto.setName(
                ("null".equals(var.get("name"))
                        || var.get("name") == null) ? null : var.get("name"));

        careProviderSearchCriteriaDto.setType(
                ("null".equals(var.get("type"))
                        || var.get("type") == null) ? null : var.get("type"));

        careProviderSearchCriteriaDto.setPriCaregiver(
                ("null".equals(var.get("priCaregiver"))
                        || var.get("priCaregiver") == null) ? null : var.get("priCaregiver"));

        careProviderSearchCriteriaDto.setSecCaregiver(
                ("null".equals(var.get("secCaregiver"))
                        || var.get("secCaregiver") == null) ? null : var.get("secCaregiver"));

        careProviderSearchCriteriaDto.setStatus(
                ("null".equals(var.get("status"))
                        || var.get("status") == null) ? null : var.get("status"));
        log.info("SearchCareGiver :" + careProviderSearchCriteriaDto);
        return careProviderSearchService.searchCareGiver(careProviderSearchCriteriaDto);
    }

    @GetMapping(value = "/readCapacity/{id}", produces = "application/json")
    @ApiOperation("Read CGCapacity")
    public ResponseEntity<CapacityDto> readCapacity(@PathVariable("id") Long id) {
        // return capacityService.readCapacity(cgProviderId);
        CapacityDto capacityDto = new CapacityDto();
        try {
            capacityDto = capacityService.readCapacity(id);
        } catch (EntityNotFoundException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        log.info("ReadCapacity " + "id :" + id);
        return new ResponseEntity<>(capacityDto, HttpStatus.OK);
    }

    @PutMapping(value = "/saveCapacity", produces = "application/json")
    @ApiOperation("Save or Update Capacity")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CapacityDto> saveCapacity(@RequestBody CapacityDto capacityDto) {
        capacityDto = capacityService.saveCapacity(capacityDto);
        log.info("SaveCapacity :" + capacityDto);
        return new ResponseEntity<>(capacityDto, HttpStatus.CREATED);
    }

    @GetMapping(value = "/getAllContactNotes/{cgcontactnotesid}", produces = "application/json")
    @ApiOperation("Read All ContactNotes")
    @ResponseStatus(HttpStatus.OK)
    public ContactNotesDto getAllContactNotes(@PathVariable("cgcontactnotesid") Long cgContactNotesId) {
        log.info("GetAllContactNotes " + "cgContactNotesId :" + cgContactNotesId);
        return contactNotesService.getAllContactNotes(cgContactNotesId);
    }

    @PutMapping(value = "/saveAllContactNotes", produces = "application/json")
    @ApiOperation("Save All ContactNotes")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ContactNotesDto> saveAllContactNotes(@RequestBody ContactNotesDto contactNotesDto) {
        contactNotesDto = contactNotesService.saveAllContactNotes(contactNotesDto);
        log.info("SaveAllContactNotes :" + contactNotesDto);
        return new ResponseEntity<>(contactNotesDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/removeContactNotes/{cgcontactnotesid}")
    @ApiOperation("Remove Contact Notes")
    public ResponseEntity<String> removeContactNotes(@PathVariable("cgcontactnotesid") Long cgContactNotesId) {
        contactNotesService.removeContactNotes(cgContactNotesId);
        log.info("RemoveContactNotes " + "cgContactNotesId :" + cgContactNotesId);
        return new ResponseEntity("Operation Successful", HttpStatus.OK);
    }

    @GetMapping(value = {"/searchContactNotes/{cgproviderid}/{data}"}, produces = "application/json")
    @ApiOperation("Search CareGiverContactNotes")
    @ResponseStatus(HttpStatus.OK)
    public List<CareGiverContactNotesSearchResultsDto> searchCareGiverContactNotes(
            @PathVariable Map<String, String> var) {
        CareGiverContactNotesSearchCriteriaDto cgContactNotesSearchCriteriaDto = new CareGiverContactNotesSearchCriteriaDto();
        cgContactNotesSearchCriteriaDto.setCgProviderId(("null".equals(var.get("cgproviderid"))
                || var.get("cgproviderid") == null) ? null : Long.parseLong(var.get("cgproviderid")));
        cgContactNotesSearchCriteriaDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ? null : var.get("data"));
        log.info("SearchCareGiverContactNotes :" + cgContactNotesSearchCriteriaDto);
        return careGiverContactNotesSearchService.searchContactNotes(cgContactNotesSearchCriteriaDto);
    }

    @GetMapping(value = "/readCareGiversBackGroundCheck/{cgproviderid}", produces = "application/json")
    @ApiOperation("Read CareGiversBackGroundCheck")
    public CareGiversBackGroundCheckDto readCareGiversBackGroundCheck(@PathVariable("cgproviderid") Long cgProviderId) {
        log.info("ReadCareGiversBackGroundCheck " + "cgProviderId :" + cgProviderId);
        return cgBackGroundCheckService.readCareGiversBackGroundCheck(cgProviderId);
    }

    @PutMapping(value = "/saveCareGiversBackGroundCheck", produces = "application/json")
    @ApiOperation("Save CareGiversBackGroundCheck")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CareGiversBackGroundCheckDto> saveCareGiversBackGroundCheck(
            @RequestBody CareGiversBackGroundCheckDto cgBackGroundCheckDto) {
        cgBackGroundCheckDto = cgBackGroundCheckService.saveCareGiversBackGroundCheck(cgBackGroundCheckDto);
        log.info("Save CareGiversBackGroundCheck :" + cgBackGroundCheckDto);
        return new ResponseEntity<>(cgBackGroundCheckDto, HttpStatus.CREATED);
    }

    @PutMapping(value = "/saveCGAppointment", produces = "application/json")
    @ApiOperation("Save or Update caregiver Appointment Informtion")
    @ResponseStatus(HttpStatus.CREATED)
    public List<CaregiverAppointmentDto> saveCaregiverAppointment(
            @RequestBody CaregiverAppointmentDto caregiverAppointmentDto) {
        log.info("Save or Update caregiver Appointment Informtion :"+caregiverAppointmentDto);
        return cgAppointmentService.saveCgAppointment(caregiverAppointmentDto);
    }

    @DeleteMapping("/deleteCGAppointment/{cgAppointmentId}")
    @ApiOperation("Remove Counselor CFS Workers")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void removeParticipantAppointment(@PathVariable("cgAppointmentId") Long cgAppointmentId) {
        log.info("Remove Counselor CFS Workers By cgAppointmentId :"+cgAppointmentId);
        cgAppointmentService.removeICAppointment(cgAppointmentId);
    }

    @GetMapping(value = {"/searchCGAppointment/{id}/{data}"}, produces = "application/json")
    @ApiOperation("Search Initial Contact Appointment Information")
    @ResponseStatus(HttpStatus.OK)
    public List<CaregGiverSearchAppointmentResultDto> searchCGAppointment(@PathVariable Map<String, String> var) {
        CareGiverSearchAppointmentDto careGiverSearchAppointmentDto = new CareGiverSearchAppointmentDto();
        careGiverSearchAppointmentDto.setId(("null".equals(var.get("id"))
                || var.get("id") == null) ? null : Long.parseLong(var.get("id")));
        careGiverSearchAppointmentDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ? null : var.get("data"));
        log.info("Search Initial Contact Appointment Information :"+careGiverSearchAppointmentDto);
        return careGiverSearchAppointmentService.searchCGAppointment(careGiverSearchAppointmentDto);
    }

    @GetMapping(value = "/readOneAppointment/{CGAppointmentId}", produces = "application/json")
    @ApiOperation("Read CareGiver Appointment Information")
    @ResponseStatus(HttpStatus.OK)
    public CaregiverAppointmentDto readOneAppointment(@PathVariable("CGAppointmentId") Long CGAppointmentId) {
        log.info("Read CareGiver Appointment Information By CGAppointmentId :"+CGAppointmentId);
        return cgAppointmentService.readOneAppointment(CGAppointmentId);
    }

    @PutMapping(value = "/saveCareGiverReminder", produces = "application/json")
    @ApiOperation("Save All CareGiverReminder")
    @ResponseStatus(HttpStatus.OK)
    public List<CareGiverReminderDto> saveCGReminder(@RequestBody CareGiverReminderDto careGiverReminderDto) {
        log.info("SaveCGReminder :" + careGiverReminderDto);
        return careGiverReminderService.saveCGReminder(careGiverReminderDto);

    }

    @GetMapping(value = "/readCGReminder/{cgReminderId}", produces = "application/json")
    @ApiOperation("Read ICReminder")
    @ResponseStatus(HttpStatus.OK)
    public CareGiverReminderDto readCGReminder(@PathVariable("cgReminderId") Long cgReminderId) {
        log.info("ReadCGReminder " + "cgReminderId :" + cgReminderId);
        return careGiverReminderService.readCGReminder(cgReminderId);
    }

    @DeleteMapping("/removeCGReminder/{cgReminderId}")
    @ApiOperation("Remove Contact Notes")
    public ResponseEntity<String> removeCGReminder(@PathVariable("cgReminderId") Long cgReminderId) {
        careGiverReminderService.removeCGReminder(cgReminderId);
        log.info("RemoveCGReminder " + "cgReminderId :" + cgReminderId);
        return new ResponseEntity("Operation Successful", HttpStatus.OK);
    }

    @GetMapping(value = {"/searchCGReminder/{cgProviderId}/{data}"}, produces = "application/json")
    @ApiOperation("Search CareGiver Reminder")
    @ResponseStatus(HttpStatus.OK)
    public List<CareGiverSearchReminderResultDto> searchCGReminder(@PathVariable Map<String, String> var) {
        CareGiverSearchReminderDto careGiverSearchReminderDto = new CareGiverSearchReminderDto();
        careGiverSearchReminderDto.setCgProviderId(("null".equals(var.get("cgProviderId"))
                || var.get("cgProviderId") == null) ? null : Long.parseLong(var.get("cgProviderId")));
        careGiverSearchReminderDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ? null : var.get("data"));
        log.info("SearchCGReminder :"+careGiverSearchReminderDto);
        return careGiverSearchReminderService.searchCGReminder(careGiverSearchReminderDto);
    }

}
