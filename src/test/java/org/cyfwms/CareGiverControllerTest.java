package org.cyfwms;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.cyfwms.caregiver.dto.*;
import org.cyfwms.caregiver.service.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class CareGiverControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CareProviderService careProviderService;

    @MockBean
    private CapacityService capacityService;

    @MockBean
    private CareProviderSearchService careProviderSearchService;

    @MockBean
    private ContactNotesService contactNotesService;

    @MockBean
    private CareGiverContactNotesSearchService careGiverContactNotesSearchService;

    @MockBean
    private CareGiversBackGroundCheckService cgBackGroundCheckService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void readCareProviderTest() throws Exception {
        CareProviderDto careProviderDto = CareProviderDto.builder().Id(3L).name("anuj").status("ACTIVE").type("service").otherType("operator").address("vijaynagar")
                .city("indore").postalCode("123").province("India").phoneNumber("12345").email("anuj@gmail.com").primaryCaregiver("rajat").secondaryCaregiver("noone").referenceId(1L).build();

        Mockito.when(careProviderService.read(any())).thenReturn(careProviderDto);

        mockMvc.perform(get("/v1/caregiverservice/care_provider/read/3")
                        .content(objectMapper.writeValueAsString(careProviderDto))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.referenceId").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("anuj"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("ACTIVE"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.type").value("service"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.otherType").value("operator"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.address").value("vijaynagar"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.city").value("indore"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.postalCode").value("123"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.province").value("India"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.phoneNumber").value("12345"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("anuj@gmail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.primaryCaregiver").value("rajat"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.secondaryCaregiver").value("noone"))
                .andExpect(status().isOk());
    }

    @Test
    public void saveCareProviderTest() throws Exception {
        CareProviderDto careProviderDto = CareProviderDto.builder().Id(4L).name("anuj").status("ACTIVE").type("service").otherType("operator").address("vijaynagar")
                .city("indore").postalCode("123").province("India").phoneNumber("12345").email("anuj@gmail.com").primaryCaregiver("rajat").secondaryCaregiver("noone").referenceId(1L).build();

        Mockito.when(careProviderService.save(any())).thenReturn(careProviderDto);

        mockMvc.perform(put("/v1/caregiverservice/care_provider/save")
                .content(objectMapper.writeValueAsString(careProviderDto))
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.referenceId").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("anuj"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("ACTIVE"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.type").value("service"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.otherType").value("operator"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.address").value("vijaynagar"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.city").value("indore"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.postalCode").value("123"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.province").value("India"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.phoneNumber").value("12345"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("anuj@gmail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.primaryCaregiver").value("rajat"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.secondaryCaregiver").value("noone"))
                .andExpect(status().isCreated());
    }

    @Test
    public void removeCareProviderTest() throws Exception {
        long referenceId = 3L;
        willDoNothing().given(careProviderService).remove(referenceId);

        mockMvc.perform(delete("/v1/caregiverservice/care_provider/remove/3"))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void searchCareGiverTest() throws Exception {
        List<CareProviderSearchResultsDto> careProviderSearchResultsDtoList = new ArrayList<>();
        careProviderSearchResultsDtoList.add(CareProviderSearchResultsDto.builder().cgProviderId(1L).name("shubham").type("employee").priCaregiver("ankit")
                .secCaregiver("shubh").referenceId(5L).status("ACTIVE").build());

        Mockito.when(careProviderSearchService.searchCareGiver(any())).thenReturn(careProviderSearchResultsDtoList);
        mockMvc.perform(get("/v1/caregiverservice/careGiverProviderSearch/5/null/null/null/null/null/"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()", is(careProviderSearchResultsDtoList.size())));
    }

    @Test
    public void readCapacityTest() throws Exception {
        CapacityDto capacityDto = CapacityDto.builder().cgCapacityId(2L).cgProviderId(3L).currUtil(4L).maximumCap(6L).preferences("no")
                .currUtilDetails("yes").build();
        Mockito.when(capacityService.readCapacity(any())).thenReturn(capacityDto);

        mockMvc.perform(get("/v1/caregiverservice/readCapacity/3"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.cgProviderId").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.cgCapacityId").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.currUtil").value(4))
                .andExpect(MockMvcResultMatchers.jsonPath("$.maximumCap").value(6))
                .andExpect(MockMvcResultMatchers.jsonPath("$.preferences").value("no"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.currUtilDetails").value("yes"))
                .andExpect(status().isOk());
    }

    @Test
    public void saveCapacityTest() throws Exception {
        CapacityDto capacityDto = CapacityDto.builder().cgCapacityId(2L).cgProviderId(3L).currUtil(4L).maximumCap(6L).preferences("no")
                .currUtilDetails("yes").build();
        Mockito.when(capacityService.saveCapacity(any(CapacityDto.class))).thenReturn(capacityDto);

        mockMvc.perform(put("/v1/caregiverservice/saveCapacity")
                .content(objectMapper.writeValueAsString(capacityDto))
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.cgProviderId").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.cgCapacityId").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.currUtil").value(4))
                .andExpect(MockMvcResultMatchers.jsonPath("$.maximumCap").value(6))
                .andExpect(MockMvcResultMatchers.jsonPath("$.preferences").value("no"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.currUtilDetails").value("yes"))
                .andExpect(status().isCreated());
    }

    @Test
    public void getAllContactNotesTest() throws Exception {
        ContactNotesDto contactNotesDto = ContactNotesDto.builder().cgContactNotesId(1L).contactMethod("nomethod").time(LocalTime.of(02, 45, 56)).date(LocalDate.of(2021, 02, 03)).additionalInformation("noinfo").cgProviderId(4L)
                .needAddress("yes").summary("sum").build();

        Mockito.when(contactNotesService.getAllContactNotes(any())).thenReturn(contactNotesDto);
        mockMvc.perform(get("/v1/caregiverservice/getAllContactNotes/4"))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void saveAllContactNotesTest() throws Exception {
        ContactNotesDto contactNotesDto = ContactNotesDto.builder().cgContactNotesId(1L).contactMethod("nomethod").time(LocalTime.of(02, 45, 56)).date(LocalDate.of(2021, 02, 03)).additionalInformation("noinfo").cgProviderId(4L)
                .needAddress("yes").summary("sum").build();

        Mockito.when(contactNotesService.saveAllContactNotes(any())).thenReturn(contactNotesDto);
        mockMvc.perform(put("/v1/caregiverservice/saveAllContactNotes")
                        .content(objectMapper.writeValueAsString(contactNotesDto))
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isCreated())
                        .andDo(print());

    }

    @Test
    public void removeContactNotesTest() throws Exception {
        long cgContactNotesId = 3L;
        willDoNothing().given(contactNotesService).removeContactNotes(cgContactNotesId);

        mockMvc.perform(delete("/v1/caregiverservice/removeContactNotes/3"))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    public void searchCareGiverContactNotesTest() throws Exception {
        List<CareGiverContactNotesSearchResultsDto> careGiverContactNotesSearchResultsDtoList = new ArrayList<>();
        careGiverContactNotesSearchResultsDtoList.add(CareGiverContactNotesSearchResultsDto.builder().cgProviderId(1L).cgContactNotesId(4L).name("manish").contactMethod("save")
                .date(LocalDate.of(2021, 02, 01)).needAddress("indore").build());

        when(careGiverContactNotesSearchService.searchContactNotes(any())).thenReturn(careGiverContactNotesSearchResultsDtoList);

        mockMvc.perform(get("/v1/caregiverservice/searchContactNotes/1/indore"))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    public void readCareGiversBackGroundCheckTest() throws Exception {
        CareGiversBackGroundCheckDto careGiversBackGroundCheckDto = CareGiversBackGroundCheckDto.builder().cgBackGroundCheckId(2L).cgProviderId(4L)
                .priBGCheckStatus("ACTIVE").secBGCheckStatus("NOACTIVE").secTrainingCompleted("yes").build();

        when(cgBackGroundCheckService.readCareGiversBackGroundCheck(any())).thenReturn(careGiversBackGroundCheckDto);

        mockMvc.perform(get("/v1/caregiverservice/readCareGiversBackGroundCheck/4"))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void saveCareGiversBackGroundCheckTest() throws Exception {
        CareGiversBackGroundCheckDto careGiversBackGroundCheckDto = CareGiversBackGroundCheckDto.builder().cgBackGroundCheckId(2L).cgProviderId(4L)
                .priBGCheckStatus("ACTIVE").secBGCheckStatus("NOACTIVE").secTrainingCompleted("yes").build();

        when(cgBackGroundCheckService.saveCareGiversBackGroundCheck(any())).thenReturn(careGiversBackGroundCheckDto);

        mockMvc.perform(put("/v1/caregiverservice/saveCareGiversBackGroundCheck")
                        .content(objectMapper.writeValueAsString(careGiversBackGroundCheckDto))
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isCreated())
                        .andDo(print());
    }
}