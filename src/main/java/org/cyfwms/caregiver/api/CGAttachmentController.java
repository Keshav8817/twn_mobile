package org.cyfwms.caregiver.api;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.caregiver.dto.CGAttachmentDto;
import org.cyfwms.caregiver.entity.CGAttachmentEntity;
import org.cyfwms.caregiver.service.CGAttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/caregiverservice/attachments")
@CrossOrigin("*")
@Slf4j
public class CGAttachmentController {
    @Autowired
    CGAttachmentService cgAttachmentService;

    @ApiOperation("Save/Upload/Put one/single attachment.")
    @PutMapping("/save_one")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CGAttachmentDto> saveOne(@RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("cgDto") String cgDto) throws IOException {
        CGAttachmentDto cgAttachmentDto = cgAttachmentService.saveCGAttachment(file, cgDto);
        log.info("SaveOne :" + cgAttachmentDto);
        return ResponseEntity.ok(cgAttachmentDto);

    }

    @ApiOperation("Read/Get one/single attachment.")
    @GetMapping("/read_one/{id}")
    public CGAttachmentDto readOne(@PathVariable Long id) {
        log.info("Attachment ReadOne " + "id :" + id);
        return cgAttachmentService.getOneFile(id);
    }

    @ApiOperation("Read/Get all attachments.")
    @GetMapping(value = "/read_all/{caregiverproviderid}", produces = "application/json")
    @ResponseStatus(OK)
    public List<CGAttachmentDto> readAll(@PathVariable("caregiverproviderid") Long caregiverProviderId) {
        log.info("Attachment ReadAll " + "caregiverProviderId :" + caregiverProviderId);
        return cgAttachmentService.getAllFiles(caregiverProviderId);
    }

    @ApiOperation("Soft remove/delete one/single attachment.")
    @DeleteMapping("/remove_one/{cgimageid}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void removeOne(@PathVariable("cgimageid") Long cgImageId) {
        log.info("Soft Remove/Delete One/Single Attachment By CGImageId:"+cgImageId);
        cgAttachmentService.removeCGImage(cgImageId);
    }

    @ApiOperation("Downlaod/Get one attachments.")
    @GetMapping("/download_one/{cgImageId}")
    @ResponseBody
    public HttpEntity<byte[]> downloadOne(@PathVariable Long cgImageId, HttpServletResponse response) {
        CGAttachmentEntity cGAttachmentEntity = cgAttachmentService.downloadOne(cgImageId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentLength(cGAttachmentEntity.getAttachment().getAttachmentContents().length);
        response.setHeader("Content-Disposition", "attachment; filename=" + cGAttachmentEntity.getAttachment().getAttachmentName());
        log.info("Read/Download One/Single Attachment "+"CgImageId :"+cgImageId);
        return new HttpEntity<byte[]>(cGAttachmentEntity.getAttachment().getAttachmentContents(), headers);
    }

}
