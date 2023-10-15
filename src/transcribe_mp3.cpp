#include <iostream>
#include <string>
#include <cstdlib>
#include <sstream>
#include <vector>
#include <cstdio>

std::string processTranscriptionOutput(const std::string& rawOutput) {
    std::istringstream stream(rawOutput);
    std::string line, content;
    std::string finalTranscription = "";

    while (std::getline(stream, line)) {
        size_t pos = line.find("]   "); // finding the end of timestamp
        if (pos != std::string::npos) {
            content = line.substr(pos + 4); // extract content after timestamp
            finalTranscription += content + " ";
        }
    }

    return finalTranscription;
}

std::string convertAndTranscribe(const std::string& mp3FilePath) {
    // Generate temporary file names
    std::string tempWavFile = "temp_output.wav";

    // Convert MP3 to 16-bit WAV using ffmpeg
    std::string ffmpegCmd = "ffmpeg -i " + mp3FilePath + " -ar 16000 -ac 1 -c:a pcm_s16le " + tempWavFile;
    int result = system(ffmpegCmd.c_str());
    if (result != 0) {
        std::cerr << "Error during ffmpeg conversion." << std::endl;
        exit(EXIT_FAILURE);
    }

    // Run the transcribe_wav binary
    std::string transcribeCmd = "./transcribe_wav " + tempWavFile;
    FILE* pipe = popen(transcribeCmd.c_str(), "r");
    if (!pipe) {
        std::cerr << "Could not start the transcribe_wav process." << std::endl;
        exit(EXIT_FAILURE);
    }

    // Read and capture the output of transcribe_wav
    char buffer[128];
    std::string transcribeOutput = "";
    while (fgets(buffer, sizeof(buffer), pipe) != nullptr) {
        transcribeOutput += buffer;
    }

    pclose(pipe);
    std::remove(tempWavFile.c_str()); // Remove temporary WAV file

    return transcribeOutput;
}

int main(int argc, char** argv) {
    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " <path_to_mp3_file>" << std::endl;
        return EXIT_FAILURE;
    }

    std::string mp3FilePath = argv[1];
    std::string transcription = convertAndTranscribe(mp3FilePath);
	transcription = processTranscriptionOutput(transcription);
    std::cout << "Transcription:\n" << transcription << std::endl;

    return 0;
}

