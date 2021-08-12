import { useState, useEffect } from 'react';
import { InfoContainer, Info } from './InfoHasMore.styled';

// images
import iconInfo from './img/info-lg.svg';

const InfoHasMore = ({hasMore, what}) => {
    const [showInfo, setShowInfo] = useState(false);
    
    useEffect(function showInfoDependsHasMore() {
        setShowInfo(hasMore ? true : false);
    }, [hasMore]);

    return (
        <InfoContainer>
            <Info className="m-3" bg="info" show={showInfo} onClose={() => setShowInfo(false)}>
                <Info.Header>
                    <img src={iconInfo} className="me-2" alt="" />
                    <p><strong>You have more <em>{what}</em> to load</strong></p>
                </Info.Header>
                <Info.Body>
                    <p><small>If you have all <em>starships</em> and <em>people</em> loaded, you will be able to move between them from the info page of each of them, too.</small></p>
                    <p><small>Move down the page to load more <em>{what}</em></small></p>
                </Info.Body>
            </Info>
        </InfoContainer>
    );
};

export default InfoHasMore;
