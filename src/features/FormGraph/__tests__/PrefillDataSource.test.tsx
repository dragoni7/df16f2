import PrefillDataSource from '../components/PrefillDataSource';
import { render, screen, fireEvent } from '@testing-library/react';

describe('PrefillDataSource', () => {
  const testProps = {
    onOptionClicked: jest.fn(),
    selectedOption: 'user.name',
    label: 'User Data',
    dataPrefix: 'user',
    options: ['name', 'email', 'phone'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Test renders with the correct label', () => {
    render(<PrefillDataSource {...testProps} />);
    expect(screen.getByText('User Data')).toBeInTheDocument();
  });

  test('Test renders all provided options', () => {
    render(<PrefillDataSource {...testProps} />);

    // Initially accordion is collapsed, so we click to expand it
    fireEvent.click(screen.getByText('User Data'));

    // Check all options are rendered
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('phone')).toBeInTheDocument();
  });

  test('Test calls onOptionClicked with correct value when an option is clicked', () => {
    render(<PrefillDataSource {...testProps} />);

    fireEvent.click(screen.getByText('User Data'));
    fireEvent.click(screen.getByText('email'));

    // method was called with the correct value
    expect(testProps.onOptionClicked).toHaveBeenCalledWith('user.email');
  });

  test('Test correctly highlights the selected option', () => {
    const { container } = render(<PrefillDataSource {...testProps} />);

    fireEvent.click(screen.getByText('User Data'));

    // Find the selected list item button
    const selectedItem = container.querySelector('.MuiListItemButton-root.Mui-selected');
    expect(selectedItem).toHaveTextContent('name');

    // Other options should not be selected
    const allItems = container.querySelectorAll('.MuiListItemButton-root');
    expect(allItems.length).toBe(3);
    expect(allItems[1]).not.toHaveClass('Mui-selected');
    expect(allItems[2]).not.toHaveClass('Mui-selected');
  });

  test('Test remains collapsed by default', () => {
    render(<PrefillDataSource {...testProps} />);

    // Options should not be visible initially
    expect(screen.queryByText('name')).not.toBeVisible();
    expect(screen.queryByText('email')).not.toBeVisible();
    expect(screen.queryByText('phone')).not.toBeVisible();
  });
});
