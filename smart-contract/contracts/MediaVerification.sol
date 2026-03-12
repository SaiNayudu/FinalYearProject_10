// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MediaVerification {

    struct MediaRecord {
        bool isAI;            // true = AI-generated, false = Real
        uint8 confidence;     // 0 - 100
        uint256 timestamp;    
        address uploader;
    }

    // media hash => record
    mapping(string => MediaRecord) private records;

    // Event emitted when media is registered
    event MediaRegistered(
        string indexed mediaHash,
        bool isAI,
        uint8 confidence,
        address indexed uploader,
        uint256 timestamp
    );

    /**
     * @dev Register media hash and AI result
     */
    function registerMedia(
        string memory _mediaHash,
        bool _isAI,
        uint8 _confidence
    ) public {

        require(bytes(_mediaHash).length > 0, "Invalid hash");
        require(_confidence <= 100, "Invalid confidence");
        require(records[_mediaHash].timestamp == 0, "Already registered");

        records[_mediaHash] = MediaRecord({
            isAI: _isAI,
            confidence: _confidence,
            timestamp: block.timestamp,
            uploader: msg.sender
        });

        emit MediaRegistered(
            _mediaHash,
            _isAI,
            _confidence,
            msg.sender,
            block.timestamp
        );
    }

    /**
     * @dev Verify media by hash
     */
    function verifyMedia(string memory _mediaHash)
        public
        view
        returns (
            bool isAI,
            uint8 confidence,
            uint256 timestamp,
            address uploader
        )
    {
        require(records[_mediaHash].timestamp != 0, "Not found");

        MediaRecord memory record = records[_mediaHash];

        return (
            record.isAI,
            record.confidence,
            record.timestamp,
            record.uploader
        );
    }

    /**
     * @dev Check if media exists
     */
    function mediaExists(string memory _mediaHash)
        public
        view
        returns (bool)
    {
        return records[_mediaHash].timestamp != 0;
    }
}