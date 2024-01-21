import { useEffect, useState } from 'react';
import AnalyticsService from '../../Services/AnalyticsService';
import './AnalyticsComponent.css';

const AnalyticsComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        AnalyticsService.getAnalytics().then((response) => {
            console.log("response", response);
            setData(response.data);
        }).catch((error) => {
            console.log("error", error);
        });
    }, []);

    return (
            <div className='analytics-content'>
                {data && (
                    <>
                        <div className='analytics-item'>
                            <h2>Total Swipes</h2>
                            <p>{data.swipesToday}</p>
                        </div>
                        <div className='analytics-item'>
                            <h2>Total Left Swipes</h2>
                            <p>{data.swipeLeftToday}</p>
                        </div>
                        <div className='analytics-item'>
                            <h2>Total Matches</h2>
                            <p>{data.matchesToday}</p>
                        </div>
                    </>
                )}
            </div>
    );
};

export default AnalyticsComponent;
