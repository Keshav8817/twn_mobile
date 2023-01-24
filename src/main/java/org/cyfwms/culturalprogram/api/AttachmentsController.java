package org.cyfwms.culturalprogram.api;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.culturalprogram.dto.AttachmentDTO;
import org.cyfwms.culturalprogram.entity.AttachmentEntity;
import org.cyfwms.culturalprogram.service.AttachmentsService;
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
@Slf4j
@RequestMapping("/v1/cpa/attachments")
@CrossOrigin("*")
public class AttachmentsController {
  @Autowired
  private AttachmentsService attachmentsService;

  @ApiOperation("Save/Upload/Put one/single attachment.")
  @PutMapping("/save_one")
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<AttachmentDTO> saveOne(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("culturalDto") String culturalDto) throws IOException {
    AttachmentDTO culturalProgImage = attachmentsService.uploadImage(file, culturalDto);
    return ResponseEntity.ok(culturalProgImage);
  }

  @ApiOperation("Read/Get one/single attachment.")
  @GetMapping("/read_one/{id}")
  public AttachmentDTO readOne(@PathVariable Long id) {
    return attachmentsService.getOneFile(id);
  }

  @ApiOperation("Read/Get all attachments.")
  @GetMapping(value = "/read_all/{culturalprogramid}", produces = "application/json")
  @ResponseStatus(OK)
  public List<AttachmentDTO> readAll(@PathVariable("culturalprogramid") Long culturalProgramId) {
    return attachmentsService.getAllFiles(culturalProgramId);
  }


  @DeleteMapping("/remove_one/{culturalprogimageid}")
  @ApiOperation("Soft remove/delete one/single attachment.")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public void removeCulturalProgImage(@PathVariable("culturalprogimageid") Long culturalProgImageId) {
    attachmentsService.removeCulturalProgImage(culturalProgImageId);
  }

  @ApiOperation("Downlaod/Get one attachments.")
  @GetMapping("/download_one/{culturalProgImageId}")
  @ResponseBody
  public HttpEntity<byte[]> downloadOne(@PathVariable Long culturalProgImageId, HttpServletResponse response) {
    AttachmentEntity attachmentEntity = attachmentsService.downloadOne(culturalProgImageId);
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.IMAGE_JPEG);
    headers.setContentLength(attachmentEntity.getAttachment().getAttachmentContents().length);
    response.setHeader("Content-Disposition", "attachment; filename=" + attachmentEntity.getAttachment().getAttachmentName());
    log.info("Read/Download One/Single Attachment "+"culturalProgImageId :"+culturalProgImageId);
    return new HttpEntity<byte[]>(attachmentEntity.getAttachment().getAttachmentContents(), headers);
  }

}