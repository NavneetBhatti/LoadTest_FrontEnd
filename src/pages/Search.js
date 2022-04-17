import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useState } from 'react';
import "../App.css";


const Search = ({ onFilterTask }) => {
  const onSearch = value => console.log(value);
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterTask(e.target.value);
  };
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
  return (
    <div className='filter-search'>
      {/* <Search
      placeholder="input search text"
      enterButton="Search"
    //   size="large"
      suffix={suffix}
      onSearch={onSearch}
      className="search"
    /> */}
    <Search placeholder="" onSearch={onSearch} enterButton       className="search" />

    </div>
  );
};

export default Search;


