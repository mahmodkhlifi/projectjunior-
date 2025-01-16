const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState("products"); // Default to showing all books
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query) {
      setFilteredBooks(products);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(lowerQuery) 
      );
    });

    setFilteredBooks(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [query, products]);