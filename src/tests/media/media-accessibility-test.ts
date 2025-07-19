import { BaseAccessibilityTest, TestContext, TestResult } from '../base-test';

export class MediaAccessibilityTest extends BaseAccessibilityTest {
  name = 'Media Accessibility';
  description = 'Check for proper media accessibility (images, videos, audio)';
  category = 'media';
  priority = 'high';
  standards = ['WCAG 2.1 AA', 'WCAG 2.2 AA', 'Section 508'];

  async run(context: TestContext): Promise<TestResult> {
    const { page } = context;
    
    try {
      const result = await this.evaluateOnPage(page, () => {
        const issues: string[] = [];
        const warnings: string[] = [];
        let totalIssues = 0;

        // Check images
        const images = document.querySelectorAll('img');
        images.forEach((img: Element) => {
          const imageElement = img as HTMLImageElement;
          const hasAlt = imageElement.hasAttribute('alt');
          const hasAriaLabel = imageElement.hasAttribute('aria-label');
          const hasAriaLabelledBy = imageElement.hasAttribute('aria-labelledby');
          const isDecorative = imageElement.getAttribute('alt') === '';
          const hasRole = imageElement.hasAttribute('role');
          
          // Skip decorative images
          if (isDecorative) {
            return;
          }
          
          if (!hasAlt && !hasAriaLabel && !hasAriaLabelledBy) {
            totalIssues++;
            issues.push(`Image missing alt text: ${imageElement.outerHTML}`);
          }
          
          // Check for role="img" without proper labeling
          if (hasRole && imageElement.getAttribute('role') === 'img' && !hasAlt && !hasAriaLabel && !hasAriaLabelledBy) {
            totalIssues++;
            issues.push(`Image with role="img" missing alt text or aria-label: ${imageElement.outerHTML}`);
          }
        });

        // Check videos
        const videos = document.querySelectorAll('video');
        videos.forEach((video: Element) => {
          const videoElement = video as HTMLVideoElement;
          const hasAriaLabel = videoElement.hasAttribute('aria-label');
          const hasAriaLabelledBy = videoElement.hasAttribute('aria-labelledby');
          const hasTitle = videoElement.hasAttribute('title');
          const hasCaption = videoElement.querySelector('track[kind="captions"]');
          
          if (!hasAriaLabel && !hasAriaLabelledBy && !hasTitle) {
            totalIssues++;
            issues.push(`Video missing accessibility label: ${videoElement.outerHTML}`);
          }
          
          if (!hasCaption) {
            warnings.push(`Video missing captions: ${videoElement.outerHTML}`);
          }
        });

        // Check audio
        const audios = document.querySelectorAll('audio');
        audios.forEach((audio: Element) => {
          const audioElement = audio as HTMLAudioElement;
          const hasAriaLabel = audioElement.hasAttribute('aria-label');
          const hasAriaLabelledBy = audioElement.hasAttribute('aria-labelledby');
          const hasTitle = audioElement.hasAttribute('title');
          const hasTranscript = audioElement.querySelector('track[kind="descriptions"]');
          
          if (!hasAriaLabel && !hasAriaLabelledBy && !hasTitle) {
            totalIssues++;
            issues.push(`Audio missing accessibility label: ${audioElement.outerHTML}`);
          }
          
          if (!hasTranscript) {
            warnings.push(`Audio missing transcript: ${audioElement.outerHTML}`);
          }
        });

        // Check iframes
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach((iframe: Element) => {
          const iframeElement = iframe as HTMLIFrameElement;
          const hasTitle = iframeElement.hasAttribute('title');
          const hasAriaLabel = iframeElement.hasAttribute('aria-label');
          
          if (!hasTitle && !hasAriaLabel) {
            totalIssues++;
            issues.push(`Iframe missing title or aria-label: ${iframeElement.outerHTML}`);
          }
        });

        // Check for images with text
        const imagesWithText = Array.from(images).filter((img: Element) => {
          const imageElement = img as HTMLImageElement;
          const alt = imageElement.getAttribute('alt') || '';
          const isDecorative = alt === '';
          return alt.length > 0 && !isDecorative;
        });

        return {
          totalIssues,
          issues,
          warnings,
          stats: {
            images: images.length,
            imagesWithAlt: imagesWithText.length,
            videos: videos.length,
            audios: audios.length,
            iframes: iframes.length
          }
        };
      });

      return this.createResult(
        result.totalIssues === 0,
        result.totalIssues,
        result.issues,
        result.warnings,
        { 
          category: 'media-accessibility',
          stats: result.stats
        }
      );

    } catch (error) {
      return this.createErrorResult(`Media accessibility test failed: ${error}`);
    }
  }
} 