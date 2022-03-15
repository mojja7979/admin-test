import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Table, Form, Col, Row, Button } from "react-bootstrap";
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useRootState } from '../../lib/hooks/useRootState';
import {
  asyncGetActiveList
} from '../../modules/profile';

interface IProfileSearchItem {
  page: number,
  size: number,
  onSearch: (searchInfo: any) => void;

}

export const ProfileSearchItem = React.memo(
  ({
    page,
    size,
    onSearch,
  }: IProfileSearchItem) => {

    const {
      activeKindList
    } = useRootState((state) => state.profile);


    const dispatch = useDispatch();
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD';

    const [startDate, setStartDate] = useState<any>('');
    const [endDate, setEndDate] = useState<any>('');
    const [keyword, setKeyword] = useState<string>('');
    const [keyValue, setKeyValue] = useState<string>('');
    const [complexCode, setComplexCode] = useState<string>('');
    const [dateSelect, setDateSelect] = useState('all')

    useEffect(() => {
      dispatch(asyncGetActiveList());
    }, []);

    const onChangeDate = (_: any, dateStrings: [string, string]) => {
      const [start, end] = dateStrings;
      setStartDate(start);
      setEndDate(end);
    };

    const onChangeKeyword = (e: any) => {
      setKeyword(e.target.value);
    }
    const onChangeValue = (e: any) => {
      setKeyValue(e.target.value);
    }
    const onChangecomplexCode = (e: any) => {
      setComplexCode(e.target.value);
    }

    const handleClickRadioButton = (dateType: any) => {
      setDateSelect(dateType);
    }

    const onReSearch = (e: any) => {
      e.preventDefault();
      onSearch({
        keyword: keyword, keyValue: keyValue,
        startDate: dateSelect === 'all' ? '' : startDate,
        endDate: dateSelect === 'all' ? '' : endDate,
        complexCode: complexCode
      })
    }


    return (
      <Container>
        <Row md={4} style={{ marginBottom: '10px', paddingRight: '10px' }}>
          <Col md={{ span: 4, offset: 11 }}>
            <Button
              variant="outline-secondary"
              onClick={onReSearch}
            >조회</Button>
          </Col>
        </Row>
        <Table variant="white" bordered >

          <tbody>
            <tr>

              <td style={{ width: '10%' }}>등록 일자</td>
              <td style={{ width: '50%' }}>
                <input
                  type='radio'
                  id='period'
                  checked={dateSelect === 'all'}
                  onChange={() => handleClickRadioButton('all')} />
                <label htmlFor='radio'>전체</label>
                <input
                  style={{ marginLeft: '10px' }}
                  type='radio'
                  id='period'
                  checked={dateSelect === 'searchDate'}
                  onChange={() => handleClickRadioButton('searchDate')} />
                <label htmlFor='radio'>기간 선택</label>

                <Space direction="vertical" size={12} style={{ marginLeft: '10px' }}>
                  <RangePicker
                    format={dateFormat}
                    onChange={onChangeDate}
                    disabled={dateSelect === 'all'}
                  />
                </Space>
              </td>

              <td style={{ width: '10%' }}>활동 분야</td>
              <td style={{ width: '30%' }}>
                <Form.Select
                  aria-label="Default select example"
                  value={complexCode}
                  onChange={onChangecomplexCode}
                >
                  <option value=''>전체</option>
                  {activeKindList?.map((item, index) => {
                    return (
                      <option
                        key={`ProfileSearchItem-${index}`}
                        value={`${item.mainGubun + item.mainGubun + item.cateCode}`}
                      >
                        {item.codeName}
                      </option>
                    )
                  })}
                </Form.Select>
              </td>
            </tr>
            <tr>
              <td>직접 검색</td>
              <td colSpan={3}>
                <Form.Select style={{ width: "30%", float: "left" }}
                  aria-label="Default select example"
                  value={keyword}
                  onChange={onChangeKeyword}
                >
                  <option value="">선택</option>
                  <option value="ID">아이디</option>
                  <option value="NAME">이름</option>
                </Form.Select>
                <Form style={{ width: "60%", float: "left", marginLeft: '10px' }} onSubmit={onReSearch}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="" value={keyValue} onChange={onChangeValue} />
                  </Form.Group>
                </Form>
              </td>

            </tr>
          </tbody>
        </Table>
      </Container>
    );
  },
);

