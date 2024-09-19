import LottieHandler from "@components/feedback/LottiesHandler/LottieHandler";
import { Col, Row } from "react-bootstrap"


type GridlistProps<T> = {
    records: T[];
    renderItem: (record: T) => JSX.Element
    emptyMessage:string
}


const GridList = <T extends { id?: number }>({ records, renderItem,emptyMessage
    
}: GridlistProps<T>) => {
    

    const renderList = records.length > 0 ? records.map((record) => (
        <Col
            xl={3}
            key={record.id}
                className="d-flex justify-content-center mb-5 mt-2"
        >
        {renderItem(record)}
        
        </Col>


    )):<LottieHandler type="empty" message={emptyMessage}  />



    return (
        <Row>

{renderList}

        </Row>
  )
}

export default GridList